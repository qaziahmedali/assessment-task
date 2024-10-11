import { NextResponse } from 'next/server';

export const errorResponseService = {
  badRequest: (error: string | { error: string }) => {
    const errorMessage = typeof error === 'string' ? error : error.error;
    return NextResponse.json(
      { error: errorMessage, status: 400 },
      { status: 400 }
    );
  },
  unauthorized: (message: string = 'Unauthorized') => {
    return NextResponse.json({ error: message, status: 401 }, { status: 401 });
  },
  forbidden: (message: string = 'Forbidden') => {
    return NextResponse.json({ error: message, status: 403 }, { status: 403 });
  },
  notFound: (message: string = 'Not found') => {
    return NextResponse.json({ error: message, status: 404 }, { status: 404 });
  },
  internalServerError: (message: string = 'An error occurred') => {
    return NextResponse.json({ error: message, status: 500 }, { status: 500 });
  },
};
