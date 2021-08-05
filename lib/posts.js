import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import remark from 'remark'
import html from 'remark-html'

const postDirectory = path.join(process.cwd(),'posts')

// 构造一个目录
export function getShortPostsData(){
    const fileNames = fs.readdirSync(postDirectory)
    const allPostsData = fileNames.map(fileName =>{
        const id = fileName.replace(/\.md/,'')
        const fullPath = path.join(postDirectory,fileName)
        const fileContents = fs.readFileSync(fullPath,'utf-8')
        const matterResult = matter(fileContents)
        return {
            id,
            ...matterResult.data
        }
    })
    return allPostsData.sort((a,b) =>{
        if(a.date < b.date){
            return 1
        }else{
            return -1
        }
    })
}
// 获取post文件的ID，也就是文件名称
export function getAllPostIds(){
    const fileNames = fs.readdirSync(postDirectory)
    return fileNames.map(fileName => {
        return {
            params:{
                id: fileName.replace(/\.md$/,'')
            }
        }
    })
}
// 获取post中的metadata数据，也就是头部那一块的yml格式的数据信息
export async function getPostData(id) {
    const fullPath = path.join(postDirectory, `${id}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
  
    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents)
  
    // 使用了remark去将md的内容解析成html
    const processedContent = await remark().use(html).process(matterResult.content)

    const contentHtml = processedContent.toString()
    // Combine the data with the id
    return {
      id,
      contentHtml,
      ...matterResult.data
    }
  }