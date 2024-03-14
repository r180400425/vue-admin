// requestdb.d.ts

// 定义 requestdb 的类型声明
declare module '@/utils/requestdb' {
    import { AxiosInstance } from 'axios';
    
    interface RequestDBInstance extends AxiosInstance {
      // 可以在这里添加自定义的属性和方法
    }
  
    // 导出 requestdb 实例
    const requestdb: RequestDBInstance;
    export default requestdb;
  }
  