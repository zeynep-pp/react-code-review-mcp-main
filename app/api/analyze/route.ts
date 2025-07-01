import { NextRequest, NextResponse } from 'next/server';
import { analyzeReactCode } from '../../../tools/react-code-review';

export async function POST(request: NextRequest) {
  try {
    const { code } = await request.json();
    
    if (!code || typeof code !== 'string') {
      return NextResponse.json(
        { error: 'Code parameter is required and must be a string' },
        { status: 400 }
      );
    }

    const result = await analyzeReactCode(code);
    return NextResponse.json(result);
  } catch (error) {
    console.error('Analysis error:', error);
    return NextResponse.json(
      { error: 'Failed to analyze code' },
      { status: 500 }
    );
  }
}