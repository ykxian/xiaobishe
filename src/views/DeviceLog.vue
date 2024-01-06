<template>
  <div>
  <div style="margin:10px 0">
    <el-popconfirm
        class="ml-5"
        confirm-button-text='确定'
        cancel-button-text='我再想想'
        icon="el-icon-info"
        icon-color="red"
        title="您确定清空日志吗？"
        @confirm="clear"
    >
      <el-button type="danger" slot="reference" style="position: relative; right: 5px">清空 <i class="el-icon-delete"></i></el-button>
    </el-popconfirm>
  </div>
    <el-table :data="tableData" border stripe :header-cell-class-name="'headerBg'">
      <el-table-column prop="id" label="ID" width="80" align="center"></el-table-column>
      <el-table-column prop="time" label="时间" width="140" align="center"></el-table-column>
      <el-table-column prop="operation" label="操作"   align="center"></el-table-column>
    </el-table>
    <div style="padding: 10px 0">
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageNum"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData:[],
      pageNum:1,
      pageSize:5,
      total:0,
      id:"",
      operation:""
    }
  },
  methods: {
    clear() {

    },
    load(){
      // this.request.get("/device/page", {
      //   params: {
      //     pageNum: this.pageNum,
      //     pageSize: this.pageSize,
      //     id: this.id,
      //     time: this.time,
      //     operation: this.opration,
      //   }
      // }).then(res => {
      //   this.tableData = res.records
      //   this.total = res.total
      //   //根据type数字显示设备类型
      //   this.tableData.forEach(device=>{
      //     device.typeString =this.getTypeString(device.type);
      //     device.addressString =this.getCityString(device.address);
      //     device.warningString=this.getWaringString(device.isWarning)
      //   })
      //
      // })
    },
    handleSizeChange(pageSize) {
      this.pageSize = pageSize
      this.load()
    },
    handleCurrentChange(pageNum) {
      this.pageNum = pageNum
      this.load()
    },
  }
}
</script>