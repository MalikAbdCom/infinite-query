import InfiniteScroll from "react-infinite-scroller";
import {Person} from "./Person";
import {useInfiniteQuery} from "@tanstack/react-query";

const initialUrl = "https://swapi-node.vercel.app/api/people/";
const fetchUrl = async (url) => {
    const response = await fetch(url);
    return response.json();
};

export function InfinitePeople() {
    // TODO: get data for InfiniteScroll via React Query

    const {
        data,
        isLoading,
        isFetching,
        error,
        fetchNextPage,
        hasNextPage,
    } = useInfiniteQuery({
        queryKey: ['sw-people'],
        queryFn: ({pageParams = initialUrl}) => fetchUrl(pageParams),
        getNextPageParam: lastPage => lastPage.next || undefined,
    })

    if (isLoading) {
        return <h1>loading...</h1>
    }

    console.log({
        data
    })

    return (
        <>
            { isFetching && <h1 className={'loading'}>loading...</h1>}
            <InfiniteScroll
                loadMore={
                    () => {
                        if (!isFetching) {
                            return fetchNextPage()
                        }
                    }
                }
                hasMore={hasNextPage}
            >
                {data.pages.map(page => {
                    return (
                        <>
                            {
                                page.results.map(result => {
                                    return (
                                        <Person name={result.fields.name} eyeColor={result.fields.eye_color}
                                                hairColor={result.fields.hair_color} key={result.name}/>
                                    )
                                })
                            }
                        </>
                    )
                })}
            </InfiniteScroll>
        </>
    );
}
