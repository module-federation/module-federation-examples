import React, {useEffect, useState, useContext} from 'react';
import {ApolloClient, gql, NormalizedCacheObject, InMemoryCache} from '@apollo/client';
import {createApolloClient} from '../apolloClient';
import fetch from 'node-fetch';
import {Helmet} from "react-helmet";

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


/** A hook for all fetching logic. */
function useQuery(apolloClient, query, variables) {
    const [data, setData] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const [cache, setCache] = useState(null)

    if (!apolloClient) {
        console.log('NO APOLLO CLIENT!!!!!!!!')
        const apollo = createApolloClient({
            ssrMode: typeof window === 'undefined',
            fetch,
        });

        apolloClient = apollo.apolloClient;
    } else {
        console.log('APOLLO CLIENT IS DEFINED!!!!!!!!')
    }

    const getQuery = async (apolloClient) => {
        setIsLoading(true);
        const response = await apolloClient.query({
            query,
            variables,
            fetchPolicy: 'cache-first',
        });
        setIsLoading(false);

        if (response?.data) {
            const cache = apolloClient.cache.extract();
            console.log('YES APOLLO DID IT!!!!!!', cache)
            setData(response.data);

            if (typeof window === 'undefined') {
                setCache(apolloClient.cache.extract());
            }

        }

    }


    useEffect(() => {
        getQuery(apolloClient);

    }, [])

    /**
     * If no data on the server side, fetch it and register the
     * promise.
     * We do it at the render phase, because side effects are
     * ignored on the server side.
     */
    if (!data && !isLoading && !error && typeof window === 'undefined') {
        getQuery(apolloClient);
    }

    return {data, error, isLoading, cache};
}


export interface PokemonListProps {
    apolloClient: ApolloClient<NormalizedCacheObject>;
    limit: number;
    offset: number;
}

const PokemonList: React.FC<PokemonListProps> = ({limit, offset, apolloClient }: PokemonListProps) => {
    const {data, error, isLoading, cache} = useQuery(apolloClient, GET_POKEMONS, {limit, offset});
    // const data = {"pokemons":{"count":1281,"next":"https://pokeapi.co/api/v2/pokemon/?offset=10&limit=10","previous":null,"status":true,"message":"","results":[{"url":"https://pokeapi.co/api/v2/pokemon/1/","name":"bulbasaur","image":"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png","__typename":"PokemonItem"},{"url":"https://pokeapi.co/api/v2/pokemon/2/","name":"ivysaur","image":"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png","__typename":"PokemonItem"},{"url":"https://pokeapi.co/api/v2/pokemon/3/","name":"venusaur","image":"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png","__typename":"PokemonItem"},{"url":"https://pokeapi.co/api/v2/pokemon/4/","name":"charmander","image":"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png","__typename":"PokemonItem"},{"url":"https://pokeapi.co/api/v2/pokemon/5/","name":"charmeleon","image":"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/5.png","__typename":"PokemonItem"},{"url":"https://pokeapi.co/api/v2/pokemon/6/","name":"charizard","image":"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png","__typename":"PokemonItem"},{"url":"https://pokeapi.co/api/v2/pokemon/7/","name":"squirtle","image":"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png","__typename":"PokemonItem"},{"url":"https://pokeapi.co/api/v2/pokemon/8/","name":"wartortle","image":"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/8.png","__typename":"PokemonItem"},{"url":"https://pokeapi.co/api/v2/pokemon/9/","name":"blastoise","image":"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/9.png","__typename":"PokemonItem"},{"url":"https://pokeapi.co/api/v2/pokemon/10/","name":"caterpie","image":"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/10.png","__typename":"PokemonItem"}],"__typename":"PokemonList"}}
    const serverRenderedApplicationState = {
        cache,
    };

    // if (isLoading) return <span>loading...</span>;
    // if (error) return <span>Error! {error.message}</span>;
    // if (!data) return null;

    return (
        <div
            style={{
                padding: '1rem',
                borderRadius: '0.25rem',
                border: '4px dashed #4169e1',
            }}
        >
            <Helmet>
                <title>HELMET APP2 TITLE</title>
            </Helmet>
            {cache && <script id="__NEXT_DATA__" type="application/json">{`window.__APOLLO_STATE__ = ${JSON.stringify(serverRenderedApplicationState)}`}</script>}

            {/*<script id="__NEXT_DATA__" type="application/json">*/}
            {/*        {`props:{'pageProps':{"initialApolloState": ${serialize(data)}}}`}*/}
            {/*    </script>*/}

            <div onClick={() => console.log('App2 is interactive')}>
                <h2>This is a component from App 2.</h2>

                <p>This component is federated with its own graphql query</p>
            </div>
            <div
                style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                }}
            >
                {data && data.pokemons.results.map(pokemon => (
                    <a href={pokemon.url} style={{margin: '0.5rem'}} key={pokemon.url}>
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
                            <img src={pokemon.image} alt={pokemon.name}/>
                            <p>{pokemon.name}</p>
                        </div>
                    </a>
                ))}
            </div>
        </div>
    );
};

export default PokemonList;
