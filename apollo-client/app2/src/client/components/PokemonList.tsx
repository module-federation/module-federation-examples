import React from 'react';
import { gql, useQuery } from '@apollo/client';

export const GET_POKEMONS = gql`
  query pokemons($limit: Int, $offset: Int) {
    pokemons(limit: $limit, offset: $offset) {
      count
      next
      previous
      status
      message
      results {
        url
        name
        image
      }
    }
  }
`;

export interface PokemonListProps {
  limit: number;
  offset: number;
}

const PokemonList: React.FC<PokemonListProps> = ({ limit, offset }: PokemonListProps) => {
  const { loading, error, data } = useQuery(GET_POKEMONS, {
    variables: { limit, offset },
    fetchPolicy: 'cache-first',
  });

  if (loading) return <span>loading...</span>;
  if (error) return <span>Error! {error.message}</span>;

  return (
    <div
      style={{
        padding: '1rem',
        borderRadius: '0.25rem',
        border: '4px dashed #4169e1',
      }}
    >
      <h2>This is a component from App 2.</h2>

      <p>This component is federated with its own graphql query</p>

      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
        }}
      >
        {data.pokemons.results.map(pokemon => (
          <a href={pokemon.url} style={{ margin: '0.5rem' }} key={pokemon.url}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '1rem',
                borderRadius: '0.25rem',
                border: '4px dashed #4169e1',
              }}
            >
              <img src={pokemon.image} alt={pokemon.name} />
              <p>{pokemon.name}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default PokemonList;
