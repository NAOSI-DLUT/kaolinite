# Quiz

NAOSI 百团大战综合答题系统

## 运行项目

在根目录下创建 `.env` 文件，内容如下：

```properties
MONGODB_URI=
```

随后运行以下命令：

```bash
pnpm i
pnpm run dev
```

## 运行流程

1. 用户进入首页，点击开始答题进入 `/quiz`。
2. 在 `/quiz` 界面输入学号，选择方向，进入答题界面 `/quiz/:id`，也会在此处列出用户的历史答题记录。
3. 在 `/quiz/:id` 界面，会根据 `quiz.questions` 中的题目信息获取 `/api/question/:id` 的题目信息。
4. 用户回答完所有题目后，点击提交，会将答案提交到 `PUT /api/quiz/:id`。

## API

见 `server/api` 目录。

| 路径                      | 方法     | 参数                                   | 返回值       | 说明                     |
| ------------------------- | -------- | -------------------------------------- | ------------ | ------------------------ |
| `/api/quiz`               | `GET`    | `?uid=`                                | `Quiz[]`     | 获取用户的全部测试       |
| `/api/quiz`               | `POST`   | `{uid: string, tag: string}`           | `Quiz`       | 创建新的测试，tag 为方向 |
| `/api/quiz/:id`           | `GET`    |                                        | `Quiz`       | 获取指定测试             |
| `/api/quiz/:id`           | `PUT`    | `{answer: any}`                        | `Quiz`       | 回答测试                 |
| `/api/question/:id`       | `POST`   |                                        | `Question`   | 获取不含答案的题目信息   |
| `/api/admin/login`        | `POST`   | `{username: string, password: string}` | `Admin`      | 登录                     |
| `/api/admin/quiz`         | `GET`    |                                        | `Quiz[]`     | 获取全部测试             |
| `/api/admin/question`     | `GET`    |                                        | `Question[]` | 获取全部题目             |
| `/api/admin/question`     | `POST`   | `Question`                             | `Question`   | 创建新题目               |
| `/api/admin/question/:id` | `GET`    |                                        | `Question`   | 获取指定题目             |
| `/api/admin/question/:id` | `PUT`    | `Question`                             | `Question`   | 修改题目                 |
| `/api/admin/question/:id` | `DELETE` |                                        | `Question`   | 删除题目                 |

## Types

见 `models` 目录。
