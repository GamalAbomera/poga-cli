# Poga-Cli@1.0.0

Poga-cli is a powerful command-line tool designed to streamline the development of Vue.js projects. With this tool, you can effortlessly generate API clients, API classes, Pinia stores, components, custom template components, and CRUD (Create, Read, Update, Delete) functionalities. This simplifies the process of building robust Vue applications by automating the creation of essential project components.

## Installation

`$ npm install -g poga-cli `

## Usage

```
$ poga <command> [options]
```

Explore the full potential of the Vue CLI Package by running commands like `create-api`, `create-store` and `create-component`. Customize your Vue.js project with efficient and consistent patterns, saving development time and ensuring a scalable architecture.

## Features

### 1. Create API Client

Generate API clients with ease, allowing seamless integration with external APIs. Specify client configurations and quickly set up the foundation for efficient API communication in your Vue project.

```
$ poga init-api
Created src/shared/api/client.api.js`
```

```
$ poga init-api --name api.client --path src/shared/apisCC
Created src/src/shared/apisCC/api.client.api.js
```

`--path (-p)`: Specify the file path.
`--name (-n)`: Specify the file and class name.
`--url (-u)`: Specify the API URL.

### 2. Generate API Classes

Automatically create API classes that encapsulate API endpoints and related functionality. This enhances code organization and maintainability in Vue projects that interact with various backend services.

```
$ poga create-api
Created src/shared/api/user.api.js
```

```
$ poga create-api user --c src/shared/api.client.js --r
settings/user/profile
Created src/shared/api/user.api.js
```

`--client (-c)`: Include client class path to import it in API file.
`--resource (-r)`: Specify the resource name.

### 3. Setup Pinia Stores

Accelerate Vuex alternative, Pinia store creation with predefined templates. Streamline state management in your Vue application by quickly generating Pinia stores with the necessary structure and configurations.

```
$ poga create-store <store-name> or <store-path>
```

### 4. Design Components

Effortlessly generate Vue components for your project. Whether it's standard components or custom template components, this CLI tool supports flexible component creation tailored to your project's needs.

```
$ poga create-component <component-name> or <component-path>
```

note: the last segment of path is the component name

```
$ poga create-component users-list
Created src/components/UsersList/UsersList.vue
```

or

```
$ poga create-component mycomponents/users/users-list
Created src/mycomponents/users/UsersList/UsersList.vue
```

### 5. Build Custom Template Components

Create reusable custom template components to enhance code consistency and modularity. Define templates for components that can be reused across different sections of your Vue application.

```
$ poga create-component <component-name> || <component-path> --template <template-path>
```

```
$ poga create-component mycomponents/users/users-table --template /templates/table-template.vue
Created src/mycomponents/users/UsersList/UsersList.vue
```

`--template (-t)`: Specify the template name with path.
