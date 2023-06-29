# libs

工具函数库

## 包列表

- [request](https://github.com/eliduty/libs/tree/main/packages/request)
- [storage](https://github.com/eliduty/libs/tree/main/packages/storage)
- [type](https://github.com/eliduty/libs/tree/main/packages/type)
- [utils](https://github.com/eliduty/libs/tree/main/packages/utils)
- [validator](https://github.com/eliduty/libs/tree/main/packages/validator)

## 命令

### 开发

```shell
pnpm dev
```

### 运行测试项目

```shell
pnpm dev:vite
```

### 测试

```shell
pnpm test
```

### 构建

- 构建所有包

```shell
pnpm build
```

- 构建指定包

```shell
pnpm --filter @eliduty/type build
```

### 发布

- 发布主包

```shell
pnpm release
```

- 发布子包

```shell
pnpm release:pkg
```

- 发布指定子包

```shell
pnpm --filter @eliduty/type release
```

### 更新项目依赖

```shell
pnpm taze
```

### 代码检测

代码提交时自动运行

- 检测

```shell
pnpm lint
```

- 检测并修复

```shell
pnpm lint:fix
```

### 代码格式化

代码提交时自动运行

```shell
pnpm format
```
