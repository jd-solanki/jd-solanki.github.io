---
title: Neo4j - My Findings
description: Learn useful tips and best practices in Neo4j graph database.
date: 2024-09-04
---

::accordion

::accordion-item{label=Resources icon="i-lucide-book"}

- [YouTube Video - Neo4j Crash Course](https://www.youtube.com/watch?v=8jNPelugC2s)
::
::

## 📚 Cheatsheet

- As we have SQL for querying relational data, neo4j has "Cypher" for querying graph data.

```cypher
// ----- Simple Queries ---

// MATCH is similar to FROM in SQL
// Just like Columns in SQL, we have Nodes and Relationships in Cypher
// We refer nodes with parenthesis `()` and relationships with square brackets `[]`
// 🚨 Below two lines are just for explanation & aren't valid cypher
MATCH () // This means match a node
MATCH (node) // This means match a node and assign it to a variable `node`. This like aliasing in SQL.

// MATCH = FROM, RETURN = SELECT
MATCH (n) RETURN n // This means match a node and return it. This is similar to SELECT * FROM table in SQL.

// Assuming you're using DB given in the crash course video in resources.

// Each node will have labels attached to it to identify the type of node. E.g. Person, Movie, etc.
MATCH (player:PLAYER) RETURN player // This means match a node with label Player and return it.

// Apart from label, Each node will also have properties attached to it. E.g. name, age, etc.
// Retrieved properties will be returned as rows & columns in the result.
MATCH (player:PLAYER) RETURN player.name // Get all nodes with label "PLAYER" and return its `name` property.
MATCH (player:PLAYER) RETURN player.name, player.height // You can retrieve multiple properties as well.
// When we query like above, name column will be named as `player.name` and height column will be named as `player.height`.
MATCH (player:PLAYER) RETURN player.name AS name, player.height AS height // You can also change the name of columns. Now, We'll get `name` and `height` columns.

// ----- Filtering Queries ---
MATCH (player:PLAYER) WHERE player.name = 'Keanu Reeves' RETURN player // Get all nodes with label "PLAYER" and name "Keanu Reeves"
MATCH (player:PLAYER {name: 'Keanu Reeves'}) RETURN player // This is a shorthand for above query.
MATCH (player:PLAYER {name: 'Keanu Reeves', height: 2.7}) RETURN player // Query with multiple properties.
MATCH (player:PLAYER) WHERE player.name <> 'Keanu Reeves' RETURN player // Get all nodes with label "PLAYER" and name is not "Keanu Reeves"
MATCH (player:PLAYER) WHERE player.height >= 2 RETURN player // Get players who are taller than 2 meter.
MATCH (player:PLAYER) WHERE (player.weight / (player.height * player.height)) > 25 RETURN player // Get players who have BMI greater than 25.
MATCH (player:PLAYER) WHERE player.weight >= 100 AND player.height <= 2 RETURN player // Get players who are heavier than 100 and shorter than 2 meter.
MATCH (player:PLAYER) WHERE player.weight >= 120 OR player.height  >= 2.1 RETURN player // Get players who are heavier than 120 or taller than 2.1 meter.
MATCH (player:PLAYER) WHERE NOT player.weight >= 120 OR player.height  >= 2.1 RETURN player // Get players who are not heavier than 120 or taller than 2.1 meter.
MATCH (player:PLAYER) WHERE player.name STARTS WITH 'K' RETURN player // Get players whose name starts with 'K'.

// ----- LIMIT & SKIP ---
// This is similar to LIMIT & OFFSET in SQL
MATCH (player:PLAYER) RETURN player LIMIT 5 // Get first 5 players.
MATCH (player:PLAYER) RETURN player SKIP 5 LIMIT 5 // Skip first 5 players and get next 5 players.

// ----- ORDER BY ---
MATCH (player:PLAYER) RETURN player ORDER BY player.height DESC // Get all players and order them by name.

// ----- Query Multiple Entities ---
MATCH (player:PLAYER), (coach:COACH) RETURN player, coach // Get all players and coaches.
MATCH (player:PLAYER), (coach:COACH) WHERE player.height >= 2 RETURN player, coach // Get all players and coaches where player height is greater than 2.

// ----- Query Relationships ---
MATCH (player:PLAYER) -[:PLAYS_FOR]-> (team:TEAM) WHERE team.name = 'LA Lakers' RETURN players
```

<!-- ## ✨ Tips -->

<!-- ## 📝 Snippets -->
