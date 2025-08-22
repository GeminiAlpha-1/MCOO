import { defineLoader } from 'vitepress'
import fg from 'fast-glob'
import matter from 'gray-matter'
import fs from 'fs'
import path from 'path'

export default defineLoader({
  watch: ['**/*.md'],                          // 监听根目录所有 md
  async load() {
    const files = await fg('**/*.md', {
      ignore: ['node_modules/**', '.vitepress/**', 'dist/**']
    })
    return files.map(file => {
      const src = fs.readFileSync(path.resolve(file), 'utf-8')
      const { data: front } = matter(src)
      return {
        title: front.title || path.basename(file, '.md'),
        date: front.date || fs.statSync(path.resolve(file)).mtime,
        file,
        url: '/' + file.replace(/(^|\/)index\.md$/, '').replace(/\.md$/, '')
      }
    })
  }
})