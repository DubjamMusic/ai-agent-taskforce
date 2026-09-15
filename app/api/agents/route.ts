import { NextRequest, NextResponse } from 'next/server';

const VALID_TYPES = [
  'coding',
  'analysis',
  'deployment',
  'testing',
  'prestige',
  'shipping',
  'field-ops',
  'signal',
  'hunt',
  'quest-ui',
  'coordination',
] as const;

const agents = [
  {
    id: '1',
    name: 'Synth Coder',
    status: 'active',
    type: 'coding',
    xp: 1250,
    level: 5,
    tasksCompleted: 42,
    createdAt: new Date('2026-01-15').toISOString(),
  },
  {
    id: '2',
    name: 'Codex Operator',
    status: 'idle',
    type: 'analysis',
    xp: 890,
    level: 4,
    tasksCompleted: 28,
    createdAt: new Date('2026-01-18').toISOString(),
  },
  {
    id: '3',
    name: 'Shaltz Envoy',
    status: 'active',
    type: 'deployment',
    xp: 2100,
    level: 7,
    tasksCompleted: 67,
    createdAt: new Date('2026-01-10').toISOString(),
  },
  {
    id: 'density-warden',
    name: 'Density Warden',
    status: 'active',
    type: 'prestige',
    xp: 340,
    level: 2,
    tasksCompleted: 1,
    createdAt: new Date('2026-09-15').toISOString(),
  },
  {
    id: 'merge-surgeon',
    name: 'Merge Surgeon',
    status: 'active',
    type: 'shipping',
    xp: 310,
    level: 2,
    tasksCompleted: 1,
    createdAt: new Date('2026-09-15').toISOString(),
  },
  {
    id: 'drop-caller',
    name: 'Drop Caller',
    status: 'idle',
    type: 'field-ops',
    xp: 120,
    level: 1,
    tasksCompleted: 0,
    createdAt: new Date('2026-09-15').toISOString(),
  },
  {
    id: 'dubline-producer',
    name: 'Dubline Producer',
    status: 'idle',
    type: 'signal',
    xp: 120,
    level: 1,
    tasksCompleted: 0,
    createdAt: new Date('2026-09-15').toISOString(),
  },
  {
    id: 'bounty-scout',
    name: 'Bounty Scout',
    status: 'idle',
    type: 'hunt',
    xp: 80,
    level: 1,
    tasksCompleted: 0,
    createdAt: new Date('2026-09-15').toISOString(),
  },
  {
    id: 'concordance-cartographer',
    name: 'Concordance Cartographer',
    status: 'idle',
    type: 'quest-ui',
    xp: 90,
    level: 1,
    tasksCompleted: 0,
    createdAt: new Date('2026-09-15').toISOString(),
  },
  {
    id: 'boardroom-chair',
    name: 'Boardroom Chair',
    status: 'idle',
    type: 'coordination',
    xp: 150,
    level: 1,
    tasksCompleted: 0,
    createdAt: new Date('2026-09-15').toISOString(),
  },
];

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const status = searchParams.get('status');
    const limit = searchParams.get('limit') || '20';

    let filteredAgents = agents;
    if (status) {
      filteredAgents = agents.filter((agent) => agent.status === status);
    }

    const limitedAgents = filteredAgents.slice(0, parseInt(limit, 10));

    return NextResponse.json({
      data: limitedAgents,
      total: filteredAgents.length,
      limit: parseInt(limit, 10),
      wave: '2026-09-15',
    });
  } catch (error) {
    console.error('Error in GET /api/agents:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.name) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }

    if (!body.type) {
      return NextResponse.json({ error: 'Type is required' }, { status: 400 });
    }

    if (!VALID_TYPES.includes(body.type)) {
      return NextResponse.json(
        { error: `Type must be one of: ${VALID_TYPES.join(', ')}` },
        { status: 400 }
      );
    }

    const newAgent = {
      id: Math.random().toString(36).substring(7),
      name: body.name,
      status: 'idle',
      type: body.type,
      xp: 0,
      level: 1,
      tasksCompleted: 0,
      createdAt: new Date().toISOString(),
    };

    return NextResponse.json({ data: newAgent }, { status: 201 });
  } catch (error) {
    console.error('Error in POST /api/agents:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
