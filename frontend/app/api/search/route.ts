import { NextRequest, NextResponse } from 'next/server';
import { searchReviews } from '@/lib/reviews';
// calling strapi directly from the client would expose the api 
// api route to search reviews
// client side no longer accesses strapi directly
// instead it calls this api route
// this route calls strapi and returns the results

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get('query');
  const reviews = await searchReviews(query);
  return NextResponse.json(reviews);
}