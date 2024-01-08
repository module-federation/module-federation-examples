import React, {useEffect, useState} from 'react';

const singletons = new Set(['react', 'react-dom']);
const RenderInstances = () => {
  const [instances, setInstances] = useState([]);
  const [allVersions, setAllVersions] = useState([]);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const instanceData = __FEDERATION__.__INSTANCES__.map(({options: {shared}, name, shareScopeMap}) => ({
      name,
      shared,
      shareScopeMap
    }));
    setInstances(instanceData);

    const versions = [...new Set(instanceData.flatMap(({shared}) => Object.values(shared).map(({version}) => version)))];
    setAllVersions(versions);

    const storedFormData = JSON.parse(localStorage.getItem('formDataVMSC')) || {};
    setFormData(storedFormData);
  }, []);

  const handleFormChange = (appName, key, event, isSingleton) => {

    let newFormData = {...formData};

    if (isSingleton) {
      for (const [name, data] of Object.entries(newFormData)) {
        newFormData[name] = {...data, [key]: event.target.value};
      }
      console.log('newFormData', newFormData);
    } else {
      newFormData[appName] = {...(newFormData[appName] || {}), [key]: event.target.value};
    }


    setFormData(newFormData);
    localStorage.setItem('formDataVMSC', JSON.stringify(newFormData));
  };

  const clearLocalStorage = () => {
    localStorage.removeItem('formDataVMSC');
    setFormData({});
  };

  return (
    <>
      <div style={{display: 'flex', flexFlow: 'row wrap', justifyContent: 'space-between'}}>
        {instances.map(({name, shared}, index) => (
          <form key={index} style={{
            display: 'flex',
            flexDirection: 'column',
            flex: '1 0 25%',
            boxSizing: 'border-box',
            padding: '20px'
          }}>
            <h2>{name}</h2>
            {Object.entries(shared).map(([key, {version, useIn}]) => {
              const singleton = singletons.has(key);
              const defaultVersion = allVersions.find(ver => instances.some(({shared}) =>
                Object.values(shared).some(({useIn, version}) => useIn.includes(name) && version === ver)
              ));
              const overrideVersion = formData[name]?.[key] || defaultVersion || {};

              return (
                <div
                  key={key}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    marginBottom: "20px",
                    padding: "15px",
                    border: "1px solid #ddd",
                    borderRadius: '5px'
                  }}
                >
                  <h3 style={{ margin: '10px 0' }}>{key}</h3>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      fontSize: '0.9em',
                      color: '#666'
                    }}
                  >
                    <div style={{ marginBottom: '10px' }}>
                      <p>Ships With: {version}</p>
                      <p>Singleton: {singleton ? 'Yes' : 'No'}</p>
                      <p>Currently using: {defaultVersion}</p>
                    </div>

                    <div>
                      <label style={{ display: 'block', marginBottom: '10px' }}>
                        Override:
                        <select
                          defaultValue={overrideVersion}
                          onChange={(e) => handleFormChange(name, key, e, singleton)}
                          style={{
                            width: "100%",
                            border: "none",
                            backgroundColor: "#f4f4f4",
                            padding: "5px 10px",
                            fontSize: "0.9em",
                            margin: "5px 0 15px",
                            borderRadius: '5px'
                          }}
                        >
                          {allVersions.map((ver, index) => (
                            <option key={index} value={ver}>
                              {ver}
                            </option>
                          ))}
                        </select>
                      </label>
                      <p>Use in: {Array.from(useIn).join(', ')}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </form>
        ))}
      </div>
      <p style={{marginTop: '20px'}}>
        <button onClick={clearLocalStorage}>Clear</button>
      </p>
    </>
  );
};

export default RenderInstances;
