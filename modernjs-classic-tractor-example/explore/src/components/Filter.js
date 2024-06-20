import './Filter.css';

const Filter = ({ filters }) => {
  return (
    <div className="e_Filter">
      Filter:
      <ul>
        {filters.map(f =>
          f.active ? (
            <li key={f.name} className="e_Filter__filter--active">
              {f.name}
            </li>
          ) : (
            <li key={f.name}>
              <a href={f.url}>{f.name}</a>
            </li>
          ),
        )}
      </ul>
    </div>
  );
};

export default Filter;
