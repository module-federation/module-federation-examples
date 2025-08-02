import React, { useEffect, useState, useCallback } from 'react';

const styles = {
  container: {
    backgroundColor: '#fff',
    borderRadius: '12px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
    padding: '2rem',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '2rem',
    marginBottom: '2rem',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    border: '1px solid #e9ecef',
    padding: '1.5rem',
  },
  cardTitle: {
    fontSize: '1.25rem',
    color: '#2c3e50',
    margin: '0 0 1.5rem 0',
    paddingBottom: '0.75rem',
    borderBottom: '1px solid #e9ecef',
  },
  packageItem: {
    backgroundColor: '#f8f9fa',
    borderRadius: '6px',
    padding: '1rem',
    marginBottom: '1rem',
  },
  packageTitle: {
    fontSize: '1rem',
    color: '#3498db',
    margin: '0 0 1rem 0',
    fontWeight: '500',
  },
  infoGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '1rem',
  },
  infoSection: {
    fontSize: '0.875rem',
    color: '#666',
  },
  infoText: {
    margin: '0.5rem 0',
    display: 'flex',
    justifyContent: 'space-between',
  },
  label: {
    display: 'block',
    color: '#34495e',
    marginBottom: '0.5rem',
    fontSize: '0.875rem',
    fontWeight: '500',
  },
  select: {
    width: '100%',
    padding: '0.5rem',
    borderRadius: '4px',
    border: '1px solid #e9ecef',
    backgroundColor: '#fff',
    fontSize: '0.875rem',
    color: '#2c3e50',
    cursor: 'pointer',
    transition: 'border-color 0.2s ease',
    '&:hover': {
      borderColor: '#3498db',
    },
    '&:focus': {
      outline: 'none',
      borderColor: '#3498db',
      boxShadow: '0 0 0 2px rgba(52, 152, 219, 0.2)',
    },
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '1rem',
  },
  button: {
    padding: '0.75rem 1.5rem',
    borderRadius: '6px',
    border: 'none',
    fontSize: '0.875rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'transform 0.1s ease, box-shadow 0.2s ease',
    '&:hover': {
      transform: 'translateY(-1px)',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
  },
  clearButton: {
    backgroundColor: '#e74c3c',
    color: '#fff',
  },
  saveButton: {
    backgroundColor: '#3498db',
    color: '#fff',
  },
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
    <div style={styles.container}>
      <div style={styles.grid}>
        {instances &&
          instances.map(({ name, shared }, index) => (
            <div key={index} style={styles.card}>
              <h3 style={styles.cardTitle}>{name}</h3>
              {Object.entries(shared).map(([key, entries]) => {
                return entries.map((entry, entryIndex) => {
                  const {
                    version,
                    useIn,
                    shareConfig: { singleton },
                  } = entry;
                  const overrideVersion = formData[name]?.[key];
                  const packageVersions = instances.flatMap(
                    instance => instance.shared[key]?.map(entry => entry.version) || [],
                  );
                  const uniquePackageVersions = [...new Set(packageVersions)];
                  
                  return (
                    <div key={`${key}-${entryIndex}`} style={styles.packageItem}>
                      <h4 style={styles.packageTitle}>{key}</h4>
                      <div style={styles.infoGrid}>
                        <div style={styles.infoSection}>
                          <p style={styles.infoText}>
                            <span>Ships With:</span>
                            <span>{version}</span>
                          </p>
                          <p style={styles.infoText}>
                            <span>Singleton:</span>
                            <span>{singleton ? 'Yes' : 'No'}</span>
                          </p>
                          <p style={styles.infoText}>
                            <span>Currently using:</span>
                            <span>{overrideVersion || version}</span>
                          </p>
                        </div>
                        <div style={styles.infoSection}>
                          <label style={styles.label}>
                            Override Version
                            <select
                              value={overrideVersion || version}
                              onChange={e => handleFormChange(name, key, e, singleton)}
                              style={styles.select}
                              data-testid={`${name}-${key}-version-select`}
                            >
                              {uniquePackageVersions.map((ver, index) => (
                                <option key={index} value={ver}>
                                  {ver}
                                </option>
                              ))}
                            </select>
                          </label>
                          <p style={styles.infoText}>
                            <span>Use in:</span>
                            <span>{Array.from(useIn).join(', ')}</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                });
              })}
            </div>
          ))}
      </div>
      <div style={styles.buttonContainer}>
        <button
          onClick={clearLocalStorage}
          style={{ ...styles.button, ...styles.clearButton }}
          data-testid="clear-settings-button"
        >
          Clear Settings
        </button>
        <button
          onClick={handleReload}
          style={{ ...styles.button, ...styles.saveButton }}
          data-testid="save-reload-button"
        >
          Save and Reload
        </button>
      </div>
    </div>
  );
};

export default RenderInstances;
