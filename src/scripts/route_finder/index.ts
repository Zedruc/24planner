//@ts-nocheck
import { getGraphData } from '../../data/waypoints.ts';

class PriorityQueue {
  constructor() {
    this.items = [];
  }

  enqueue(item, priority) {
    this.items.push({ item, priority });
    this.items.sort((a, b) => a.priority - b.priority);
  }

  dequeue() {
    if (this.isEmpty()) {
      return null;
    }
    return this.items.shift().item;
  }

  isEmpty() {
    return this.items.length === 0;
  }
}

function calculateDistance(point1, point2) {
  const dx = point1.x - point2.x;
  const dy = point1.y - point2.y;
  return Math.sqrt(dx * dx + dy * dy);
}

function heuristic(point1, point2) {
  const dx = point1.x - point2.x;
  const dy = point1.y - point2.y;
  return Math.sqrt(dx * dx + dy * dy);
}

function shuffle(array) {
  const seed = Date.now();
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random(seed) * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function buildGraph(waypoints, k) {
  const graph = {};

  // Initialize graph with empty dictionaries
  for (let waypoint of waypoints) {
    graph[waypoint.identifier] = {};
  }

  // Calculate distances and build graph
  for (let i = 0; i < waypoints.length; i++) {
    const currentWaypoint = waypoints[i];
    const distances = [];

    // Calculate distances to other waypoints
    for (let j = 0; j < waypoints.length; j++) {
      if (i !== j) {
        const distance = calculateDistance(currentWaypoint, waypoints[j]);
        distances.push({ waypoint: waypoints[j], distance });
      }
    }

    // Sort distances
    distances.sort((a, b) => a.distance - b.distance);

    // Connect to k nearest neighbors
    for (let j = 0; j < Math.min(k, distances.length); j++) {
      const neighbor = distances[j].waypoint;
      graph[currentWaypoint.identifier][neighbor.identifier] = distances[j].distance;
      graph[neighbor.identifier][currentWaypoint.identifier] = distances[j].distance; // Undirected graph
    }
  }

  return graph;
}

function aStar(graph, waypoints, source, destination) {

  const openSet = new PriorityQueue();
  const cameFrom = {};
  const gScore = {};
  const fScore = {};

  for (let waypoint of waypoints) {
    gScore[waypoint.identifier] = Infinity;
    fScore[waypoint.identifier] = Infinity;
  }

  gScore[source] = 0;
  fScore[source] = heuristic(
    waypoints.find(waypoint => waypoint.identifier === source),
    waypoints.find(waypoint => waypoint.identifier === destination)
  );
  openSet.enqueue(source, fScore[source]);

  while (!openSet.isEmpty()) {
    const current = openSet.dequeue();

    if (current === destination) {
      return reconstructPath(cameFrom, current);
    }

    for (let neighbor in graph[current]) {
      const tentativeGScore = gScore[current] + graph[current][neighbor];
      if (tentativeGScore < gScore[neighbor]) {
        cameFrom[neighbor] = current;
        gScore[neighbor] = tentativeGScore;
        fScore[neighbor] =
          gScore[neighbor] +
          heuristic(
            waypoints.find(waypoint => waypoint.identifier === neighbor),
            waypoints.find(waypoint => waypoint.identifier === destination)
          );
        if (!openSet.items.some(item => item.item === neighbor)) {
          openSet.enqueue(neighbor, fScore[neighbor]);
        }
      }
    }
  }

  return null; // No path found
}

function reconstructPath(cameFrom, current) {
  const totalPath = [current];
  while (cameFrom[current] !== undefined) {
    current = cameFrom[current];
    totalPath.unshift(current);
  }


  return totalPath;
}

export { aStar as findRoute, buildGraph, shuffle };