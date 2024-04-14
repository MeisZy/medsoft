import './SearchResultsList.css';

const SearchResultsList = ({results}: {results: {name: string}[]}) => {
  return (
    <>
      <div className="resultslist">
        {results.map((result, id) =>{
            return <div key={id}>{result.name}</div>;
        })}
      </div>
    </>
  )
}

export default SearchResultsList