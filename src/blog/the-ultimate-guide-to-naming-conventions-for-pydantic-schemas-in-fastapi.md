---
title: The Ultimate Guide To Naming Conventions For Pydantic Schemas In FastAPI
tag: FastAPI, Pydantic
date: 2024-11-20
---

# {{ $frontmatter.title }}

When building APIs with **FastAPI** and **Pydantic**, schemas are critical. They define how data flows between your API and its consumers, ensuring proper validation and structure. However, **FastAPI doesn’t enforce or recommend any specific naming convention for schemas**.  

This lack of guidance, combined with the basic examples in FastAPI and SQLModel documentation, can lead to confusion as your project grows. For instance, while examples like `ItemCreate` or `ItemRead` work for simple APIs, they don’t scale well when you have more complex requirements like differentiating public-facing schemas from internal ones or handling multiple types of updates.

In this post, we’ll introduce a **scalable naming convention** for Pydantic schemas, making your codebase easier to understand, maintain, and extend.  

## The Problem With Inconsistent Naming

Let’s imagine a scenario:  
You’re building an API for managing workflows. You need schemas for creating workflows, fetching a list of workflows, viewing detailed information, updating workflows, and so on. Without a structured naming convention, you might end up with names like:  

- `WorkflowBase`
- `WorkflowIn`
- `WorkflowOut`
- `WorkflowUpdatePartial`

At first glance, it’s unclear what each schema is for. Is `WorkflowBase` for database operations or public responses? Does `WorkflowIn` mean creating or updating a workflow? Over time, this lack of clarity makes the code harder to navigate, especially for larger teams or when onboarding new developers.  

## A Scalable Naming Convention for Pydantic Schemas

Here’s a structured naming convention to solve these issues. The goal is to ensure each schema’s purpose is immediately clear.  

### Naming Pattern

| **Schema Name**          | **Purpose**                                                                                   |
|---------------------------|-----------------------------------------------------------------------------------------------|
| `WorkflowCreate`          | Public-facing schema for **creating workflows**.                                              |
| `WorkflowCreateDB?`       | Internal schema for **database operations** (e.g., auto-assigning `owner_id`).                |
| `WorkflowListItem`        | Schema for **individual workflow items** in a list (e.g., `GET /workflows`).                  |
| `WorkflowList`            | Root model schema for **the entire list** of workflows.                                       |
| `WorkflowDetails`         | Schema for **detailed view** of a workflow (e.g., `GET /workflows/{workflow_id}`).                     |
| `WorkflowUpdate?`         | Schema for **full updates** (via PUT, replacing the entire workflow).                         |
| `WorkflowUpdateDB?`       | Internal schema for **database operations** during full updates.                              |
| `WorkflowPatch`           | Public-facing schema for **partial updates** (via PATCH).                                     |
| `WorkflowPatchDB?`        | Internal schema for **database operations** during partial updates.                           |

The **`?`** indicates that the schema is optional and only needed in certain cases. For example, `WorkflowCreateDB` might be used if you need to assign internal fields like `owner_id` or `last_updated_by` during creation, but if such fields aren’t required, you can skip defining this schema.  

### Schema Naming Convention Breakdown

Let’s dive into each schema to understand its purpose and usage.  

#### 1. **WorkflowCreate**

This schema is for public-facing API operations that create workflows. It defines the fields clients can send in a request to create a workflow.  

```python
class WorkflowCreate(BaseModel):
    name: str
    description: str | None = None
```

#### 2. **WorkflowCreateDB**  

This schema extends `WorkflowCreate` to include internal fields like `owner_id`. It’s used internally to process additional data before saving to the database.  

```python
class WorkflowCreateDB(WorkflowCreate):
    owner_id: int  # Automatically assigned based on the authenticated user
```

#### 3. **WorkflowListItem**  

This schema represents an individual workflow in a list of workflows. It defines the data clients receive when fetching multiple workflows.  

```python
class WorkflowListItem(BaseModel):
    id: int
    name: str
```

#### 4. **WorkflowList**  

This is a root model for the entire list of workflows, providing type validation for list responses. It’s often a helper model for endpoints like `GET /workflows`.  

```python
WorkflowList = RootModel[Sequence[WorkflowListItem]]
```

#### 5. **WorkflowDetails**  

This schema is for endpoints like `GET /workflows/{workflow_id}` that return detailed information about a specific workflow.  

```python
class WorkflowDetails(BaseModel):
    id: int
    name: str
    description: str | None
    owner_id: int
    created_at: datetime
```

#### 6. **WorkflowUpdate**  

This schema defines the structure for full updates (PUT requests), where the client replaces the entire resource.

> _Generally, we'll create `WorkflowPatch` schema for partial updates, but if you need to support full updates, you can use this schema._

```python
class WorkflowUpdate(BaseModel):
    name: str
    description: str | None = None
```

#### 7. **WorkflowUpdateDB**  

This schema extends `WorkflowUpdate` for internal use, such as tracking who updated the workflow.  

> _Generally, we'll create `WorkflowPatchDB` schema for partial updates, but if you need to support full updates, you can use this schema._

```python
class WorkflowUpdateDB(WorkflowUpdate):
    updated_by: int  # ID of the user making the update
```

#### 8. **WorkflowPatch**  

This schema supports partial updates (PATCH requests), allowing clients to update specific fields.  

```python
class WorkflowPatch(BaseModel):
    name: str | None = None
    description: str | None = None
```

#### 9. **WorkflowPatchDB**  

This schema is used internally to handle database-specific logic for partial updates, such as recording the updater’s ID.  

```python
class WorkflowPatchDB(WorkflowPatch):
    updated_by: int
```

### Benefits of This Convention

<br>

#### 1. Clarity

Schemas are self-explanatory. Developers can immediately understand what a schema does based on its name.  

#### 2. Separation of Concerns

Public-facing schemas and internal schemas are clearly separated. This ensures a cleaner, more secure API design.  

#### 3. Scalability

As your application grows, this convention easily adapts. For instance:

- Adding a feature like archiving workflows? Simply create `WorkflowArchive` and `WorkflowArchiveDB` schemas.  
- Need a schema for cloning workflows? Add `WorkflowClone` and `WorkflowCloneDB`.  

By following this pattern, you avoid ad-hoc naming that can clutter your codebase.  

#### 4. Consistency

A consistent structure across schemas makes it easier for teams to collaborate and onboard new developers.  

### When to Use Internal Schemas (`DB` Suffix)

Internal schemas with the `DB` suffix should only be created when you need additional processing for fields like:  

- `owner_id`: Assigning ownership of a resource to the authenticated user.  
- `last_updated_by`: Tracking who last modified a resource.  

If no such fields are required, you can skip creating the `DB` schema and directly use the public-facing schema.  
