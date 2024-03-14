// 在 '/@/apis/modules/historyData' 文件中使用 requestdb 进行网络请求

import requestdb from '';
import requestdb from '@/utils/requestdb'; // 引入自定义的网络请求工具

// 获取历史数据列表
export const fetchHistoryData = (params) => {
  return requestdb.get('/history-data', { params });
};

// 更新历史数据
export const updateHistoryData = (id, data) => {
  return requestdb.put(`/history-data/${id}`, data);
};

// 删除历史数据
export const deleteHistoryData = (id) => {
  return requestdb.delete(`/history-data/${id}`);
};
