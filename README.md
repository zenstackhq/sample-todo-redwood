# Multi-Tenant Todo Sample - ZenStack + RedwoodJS

<div align="center">
    <img src="https://github.com/zenstackhq/sample-todo-sveltekit/assets/16688722/df13f0ee-1d56-4a13-9a55-39e8779c6d9f" height="256">
</div>

This project is a SaaS-like Todo app built with [RedwoodJS](https://redwoodjs.com/) and [ZenStack](https://zenstack.dev).

In this fictitious app, users can be invited to workspaces where they can collaborate on todos.

See a live deployment at: https://zenstack-todo-redwood.vercel.app

## Features

-   User signup/signin
-   Creating workspaces and inviting members
-   Managing Todo lists and items
-   Data segregation and permission control

### Authorization rules

1. A space can have many members, and a user can belong to many spaces.
2. User profiles are readable to all users in the same space, and editable by oneself.
3. Space admins can invite members to the space, remove members from the space, and set member roles.
4. Public todo lists (together todo items inside) are accessible to all members in the space.
5. Private todo lists (together todo items inside) are only accessible to the owner of the list.

See the [schema.zmodel](./api/schema.zmodel) for more details.

---

For more information on using ZenStack, visit [https://zenstack.dev](https://zenstack.dev).
