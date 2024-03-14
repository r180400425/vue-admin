<template>
    <!-- lv-charts 组件的使用 -->
    <lv-charts :options="options" :height="800"></lv-charts>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
export default defineComponent({
    name: 'platform',
    setup() {
        // 使用 ref 创建响应式数据 options
        let options = ref({})

        // 定义获取级别选项的函数
        function getLevelOption() {
            // 返回包含三个级别配置的数组
            return [
                {
                    itemStyle: {
                        borderWidth: 0,
                        gapWidth: 5
                    }
                },
                {
                    itemStyle: {
                        gapWidth: 1
                    }
                },
                {
                    colorSaturation: [0.35, 0.5],
                    itemStyle: {
                        gapWidth: 1,
                        borderColorSaturation: 0.6
                    }
                }
            ]
        }

        // 在组件挂载后执行的逻辑
        onMounted(() => {
            // 异步导入 disk.tree.json 文件
            import('./disk.tree.json').then(({ default: diskData }) => {
                // 将获取的数据设置到 options 中
                options.value = {
                    title: {
                        text: 'Disk Usage', // 设置标题文本
                        left: 'center' // 标题居中显示
                    },
                    series: [
                        {
                            name: 'Disk Usage', // 系列名称
                            type: 'treemap', // 图表类型为 treemap
                            visibleMin: 300, // 最小显示值
                            label: {
                                show: true, // 显示标签
                                formatter: '{b}' // 标签内容格式化
                            },
                            itemStyle: {
                                borderColor: '#fff' // 图形边框颜色
                            },
                            levels: getLevelOption(), // 设置级别选项
                            data: diskData // 设置数据
                        }
                    ]
                }
            })
        })
        // 返回 options 数据
        return {
            options
        }
    }
})
</script>
