import type { ServerResponse } from "node:http";
import type {
  UniverseDbNodeResponse,
  UniverseDbSearchResponse,
  UniverseDbStatusResponse
} from "@nebula/protocol";
import type { ProjectionStore } from "../storage/projectionStore.js";

function sendJson(res: ServerResponse, statusCode: number, payload: unknown): void {
  if (res.writableEnded) return;
  res.statusCode = statusCode;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.end(JSON.stringify(payload));
}

export function handleDbRoute(params: {
  pathname: string;
  searchParams: URLSearchParams;
  res: ServerResponse;
  projectionStore: ProjectionStore | null;
}): boolean {
  const { pathname, searchParams, res, projectionStore } = params;

  if (pathname === "/db/status") {
    const payload: UniverseDbStatusResponse = {
      ok: true,
      status: projectionStore ? projectionStore.getStatus() : null
    };
    sendJson(res, 200, payload);
    return true;
  }

  if (pathname === "/db/node") {
    if (!projectionStore) {
      sendJson(res, 409, {
        error: "source_not_selected",
        message: "Select a source before querying the projection database."
      });
      return true;
    }

    const id = searchParams.get("id")?.trim() ?? "";
    if (!id) {
      sendJson(res, 400, {
        error: "missing_id",
        message: "Provide a node id."
      });
      return true;
    }

    const payload: UniverseDbNodeResponse = {
      ok: true,
      node: projectionStore.getNodeById(id)
    };
    sendJson(res, 200, payload);
    return true;
  }

  if (pathname === "/db/search") {
    if (!projectionStore) {
      sendJson(res, 409, {
        error: "source_not_selected",
        message: "Select a source before querying the projection database."
      });
      return true;
    }

    const query = searchParams.get("q")?.trim() ?? "";
    const limit = Number(searchParams.get("limit") ?? 25);
    const payload: UniverseDbSearchResponse = {
      ok: true,
      query,
      results: projectionStore.search(query, Number.isFinite(limit) ? limit : 25)
    };
    sendJson(res, 200, payload);
    return true;
  }

  return false;
}
