import { NextResponse } from 'next/server';

export const successResponseService = {
  ok: (data: any) => {
    return NextResponse.json(data, { status: 200 });
  },
  created: (data: any) => {
    return NextResponse.json(data, { status: 201 });
  },
};
