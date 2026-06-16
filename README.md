# 🌸 日本語学習空間

> LingLing の JLPT N5~N1 生词、语法、翻译语料库
> 在线地址: <https://bailing1312.github.io/japanese-learning-space/>

## 📖 这是什么?

一个属于你自己的日语学习语料库网站,按 **JLPT 等级 (N5~N1)** 和 **类型 (生词 / 语法 / 翻译)** 分类整理。

- ✅ 完全免费,部署在 GitHub Pages
- ✅ 手机、电脑、平板都能访问
- ✅ 配色专业好看,深靛蓝 + 樱花粉 + 金箔
- ✅ 数据全部存在 GitHub 仓库,自己掌控

## 🎯 网站长什么样?

打开网站后你会看到:

- 顶部品牌区:🌸 + LingLing の 日本語学習空間
- 筛选器:等级 (N5~N1) + 类型 (生词/语法/翻译) + 搜索框
- 统计面板:总词条数 / 各类型数量
- 卡片墙:每条语料一张卡片,带日语、罗马音、中文释义、例句
- 添加引导:教你如何添加新语料

## 🚀 如何添加新语料?(重要!)

### 步骤 1: 打开数据文件夹

访问 👉 <https://github.com/Bailing1312/japanese-learning-space/tree/main/data>

### 步骤 2: 选择你要添加的等级和类型

例如想添加 N5 的生词,点击 `data/N5/vocab.json`

### 步骤 3: 点击右上角 ✏️ 编辑按钮

### 步骤 4: 在文件末尾添加新词条

每条词条格式:

```json
{
  "jp": "新しい単語",
  "romaji": "atarashii tango",
  "meaning": "新的单词",
  "example_jp": "これは新しい単語です。",
  "example_cn": "这是新的单词。",
  "note": "备注(可选)"
}
```

字段说明:

| 字段 | 必填 | 说明 |
|------|------|------|
| `jp` | ✅ | 日语原文 |
| `romaji` | ❌ | 罗马音(方便记忆) |
| `meaning` | ✅ | 中文释义 |
| `example_jp` | ❌ | 例句日文 |
| `example_cn` | ❌ | 例句中文 |
| `note` | ❌ | 备注(语法点、易错点等) |

### 步骤 5: 提交修改

1. 滑到页面底部
2. 填写 Commit 信息(比如「添加 N5 单词」)
3. 点击 **Commit changes**

### 步骤 6: 等待 1 分钟

GitHub Pages 会自动部署,1 分钟内网站自动更新!

## 💡 添加示例

假设你想添加一个 N3 的语法点:

1. 打开 `data/N3/grammar.json`
2. 点击 ✏️ 编辑
3. 在 `[` 和 `]` 之间添加:

```json
  {
    "jp": "〜にしては",
    "romaji": "~ ni shite wa",
    "meaning": "作为〜来说(有反差)",
    "example_jp": "子供にしてはしっかりしている。",
    "example_cn": "作为孩子来说挺稳重的。"
  }
```

4. 注意前一行结尾加逗号 `,`
5. 提交即可

## 🎨 自定义样式

如果你想改颜色或布局,改 `style.css` 文件就行。
主要变量在文件顶部:

```css
--color-primary: #1a365d;  /* 主色 - 深靛蓝 */
--color-accent: #d4536e;   /* 强调色 - 樱花粉 */
--color-gold: #c69b51;     /* 金箔 */
```

## 🛠️ 技术栈

- 纯 HTML + CSS + JavaScript,无任何框架依赖
- 字体:Noto Sans/Serif JP + Inter
- 数据:JSON 文件存 GitHub 仓库
- 部署:GitHub Pages(免费)

## 📝 License

MIT - 这是你的私人语料库,自由使用 🎉
