'use client'
import { useSearchParams } from "next/navigation"
import { Product } from "../types/product"
import { useQuery } from "@tanstack/react-query"
import { fetchSearchResult } from "../utils/axios"
import CardList from "../components/CardLIst/CardList"
import Search from "../components/Search/Search"

export default function SearchPage() {
  const params = useSearchParams()
	const q = params.get('q') || ''

	const {data: products = [], isLoading, isError} = useQuery<Product[], Error> (
		{
			queryKey: ['search', q],
			queryFn: () => fetchSearchResult(q),
			enabled: !!q,
		})

		if (!q) return <p className="flex justify-center">Type something to search</p>

		if (isLoading) {
			return <p>Loading</p>
		}
 
		if (isError) {
			return <p>Error</p>
		}

  return (
    <div className="font-beatrice flex flex-col items-center gap-10 pt-10	">
			<Search/>
			{products?.length === 0 && (
				<p>No results for "{q}"</p>
			)}
			{
				products?.length > 0 && (
					<>
						<h1 className="text-2xl font-bold">Results for "{q}"</h1>
						<CardList items={products}/>
					</>
				)
			}
		</div>
  )
}
