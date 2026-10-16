const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3015';

function getAuthHeader(): Record<string, string> {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('nirmaniq_token');
    if (token) {
      return { Authorization: `Bearer ${token}` };
    }
  }
  return {};
}

async function handleResponse(res: Response) {
  if (!res.ok) {
    const errorBody = await res.json().catch(() => ({}));
    const message = errorBody.message || `Request failed with status ${res.status}`;
    throw new Error(Array.isArray(message) ? message.join(', ') : message);
  }
  return await res.json();
}

export async function apiLogin(email: string, password: string) {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  return handleResponse(res);
}

export async function apiGetProfile() {
  const res = await fetch(`${API_BASE}/auth/me`, {
    headers: { ...getAuthHeader() },
  });
  return handleResponse(res);
}

export async function apiGetProjects(status?: string, search?: string) {
  const params = new URLSearchParams();
  if (status && status !== 'ALL') params.append('status', status);
  if (search) params.append('search', search);

  const url = `${API_BASE}/projects${params.toString() ? `?${params.toString()}` : ''}`;
  const res = await fetch(url, {
    headers: { ...getAuthHeader() },
  });
  return handleResponse(res);
}

export async function apiGetProject(id: string) {
  const res = await fetch(`${API_BASE}/projects/${id}`, {
    headers: { ...getAuthHeader() },
  });
  return handleResponse(res);
}

export async function apiCreateProject(data: { name: string; description?: string; status?: string }) {
  const res = await fetch(`${API_BASE}/projects`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeader(),
    },
    body: JSON.stringify(data),
  });
  return handleResponse(res);
}

export async function apiGetTower(id: string) {
  const res = await fetch(`${API_BASE}/towers/${id}`, {
    headers: { ...getAuthHeader() },
  });
  return handleResponse(res);
}

export async function apiAddTower(projectId: string, data: { name: string; riskLevel?: number; floorCount?: number }) {
  const res = await fetch(`${API_BASE}/projects/${projectId}/towers`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeader(),
    },
    body: JSON.stringify(data),
  });
  return handleResponse(res);
}

export async function apiUpdateFloorProgress(floorId: string, completionPercentage: number) {
  const res = await fetch(`${API_BASE}/floors/${floorId}/progress`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeader(),
    },
    body: JSON.stringify({ completionPercentage }),
  });
  return handleResponse(res);
}
