import React, { useEffect, useState, useCallback } from 'react';

const singletons = new Set(['react', 'react-dom']);
const buttonStyle = {
  backgroundColor: '#4CAF50' /* Green */,
  border: 'none',
  color: 'white',
  padding: '15px 32px',
  textAlign: 'center',
  textDecoration: 'none',
  display: 'inline-block',
  fontSize: '16px',
  margin: '4px 2px',
  cursor: 'pointer',
};

const RenderInstances = () => {
  const [formData, setFormData] = useState(
    () => JSON.parse(localStorage.getItem('formDataVMSC')) || {},
  );
  const [instancesData, setInstancesData] = useState({});

  useEffect(() => {
    const instanceData = __FEDERATION__.__INSTANCES__.map(
      ({ options: { shared }, name, shareScopeMap }) => ({
        name,
        shared,
        shareScopeMap,
      }),
    );

    const versions = [
      ...new Set(
        instanceData.flatMap(({ shared }) => Object.values(shared).map(({ version }) => version)),
      ),
    ];

    setInstancesData({ instances: instanceData, allVersions: versions });
  }, [formData]);

  const handleFormChange = useCallback((appName, key, event, isSingleton) => {
    const eventValue = event.target.value;

    setFormData(prevState => {
      let newFormData = isSingleton
        ? { ...prevState }
        : { ...prevState, [appName]: { ...(prevState[appName] || {}) } };

      if (!newFormData[appName]) newFormData[appName] = {};

      if (isSingleton) {
        for (const [name, data] of Object.entries(newFormData)) {
          newFormData[name] = { ...data, [key]: eventValue };
        }
      } else {
        newFormData[appName][key] = eventValue;
      }

      localStorage.setItem('formDataVMSC', JSON.stringify(newFormData));
      return newFormData;
    });
  }, []);

  const clearLocalStorage = useCallback(() => {
    localStorage.removeItem('formDataVMSC');
    setFormData({});
  }, []);

  const handleReload = useCallback(() => {
    window.location.reload();
  }, []);

  const { instances, allVersions } = instancesData;
  return (
    <>
      <div style={{ display: 'flex', flexFlow: 'row wrap', justifyContent: 'space-between' }}>
        {instances &&
          instances.map(({ name, shared }, index) => {
            return (
              <form
                key={index}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  flex: '1 0 25%',
                  boxSizing: 'border-box',
                  padding: '10px',
                }}
              >
                <h2>{name}</h2>
                {Object.entries(shared).map(([key, entries]) => {
                  return entries.map((entry, entryIndex) => {
                    const { version, useIn, shareConfig: { singleton } } = entry;
                    const overrideVersion = formData[name]?.[key];
                    // Get all versions specific to the package
                    const packageVersions = instances.flatMap(instance =>
                      instance.shared[key]?.map(entry => entry.version) || [],
                    );
                    const uniquePackageVersions = [...new Set(packageVersions)];
                    return (
                      <div
                        key={`${key}-${entryIndex}`}
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          marginBottom: '10px',
                          padding: '5px',
                          border: '1px solid #ddd',
                          borderRadius: '5px',
                        }}
                      >
                        <h3 style={{margin: '10px 0'}}>{key}</h3>
                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            fontSize: '0.9em',
                            color: '#666',
                          }}
                        >
                          <div style={{marginBottom: '5px'}}>
                            <p>Ships With: {version}</p>
                            <p>Singleton: {singleton ? 'Yes' : 'No'}</p>
                            <p>Currently using: {overrideVersion || version}</p>
                            <p>Override using: {overrideVersion || 'not set'}</p>
                          </div>
                          <div>
                            <label style={{display: 'block', marginBottom: '5px'}}>
                              Override:
                              <select
                                defaultValue={overrideVersion}
                                value={overrideVersion}
                                onChange={e => handleFormChange(name, key, e, singleton)}
                                style={{
                                  width: '100%',
                                  border: 'none',
                                  backgroundColor: '#f4f4f4',
                                  padding: '5px 10px',
                                  fontSize: '0.9em',
                                  margin: '5px 0 10px',
                                  borderRadius: '5px',
                                }}
                              >
                                {uniquePackageVersions.map((ver, index) => (
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
                  });
                })}
              </form>
            )
          })}
      </div>
      <p style={{ marginTop: '0px' }}>
        <button onClick={clearLocalStorage} style={buttonStyle}>
          Clear
        </button>
        <button
          onClick={handleReload}
          style={{ ...buttonStyle, marginLeft: '10px', backgroundColor: '#008CBA' }}
        >
          Save and Reload
        </button>
      </p>
    </>
  );
};

export default RenderInstances;
