// 在 '/@/apis/modules/historyData' 文件中定义相关的 API 函数

import requestdb from '@/utils/requestdb'; // 假设已经封装了网络请求工具 request

// 获取历史数据列表
export const fetchHistoryData = (params) => {
  return request.get('/api/history-data', { params });
};

// 更新历史数据
export const updateHistoryData = (id, data) => {
  return request.put(`/api/history-data/${id}`, data);
};

// 删除历史数据
export const deleteHistoryData = (id) => {
  return request.delete(`/api/history-data/${id}`);
};
