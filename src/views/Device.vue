<template>
  <div>
    <div style="margin: 10px 0">
      <el-input style="width: 200px" placeholder="请输入ID" suffix-icon="el-icon-search" v-model="id"></el-input>
      <el-input style="width: 200px" placeholder="请输入名称" suffix-icon="el-icon-message" class="ml-5" v-model="dName"></el-input>
      <el-button class="ml-5" type="primary" @click="load">搜索</el-button>
      <el-button type="warning" @click="reset">重置</el-button>
    </div>

    <div style="margin: 10px 0">
      <el-button type="primary" @click="handleAdd">添加 <i class="el-icon-circle-plus-outline"></i></el-button>
      <el-popconfirm
          class="ml-5"
          confirm-button-text='确定'
          cancel-button-text='我再想想'
          icon="el-icon-info"
          icon-color="red"
          title="您确定批量删除这些数据吗？"
          @confirm="delBatch"
      >
        <el-button type="danger" slot="reference">批量删除 <i class="el-icon-remove-outline"></i></el-button>
      </el-popconfirm>
      <el-button style="margin:5px" type="primary" @click="handleExport">导出 <i class="el-icon-top"></i></el-button>
    </div>

    <el-table :data="tableData" border stripe :header-cell-class-name="'headerBg'"  @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="id" label="ID" width="80"></el-table-column>
      <el-table-column prop="dName" label="名称" width="140"></el-table-column>
      <el-table-column prop="typeString" label="类型" width="120"></el-table-column>
      <el-table-column prop="online" label="在线状态" width="120">在线</el-table-column>
      <el-table-column prop="warningString" label="报警状态" width="120"></el-table-column>
      <el-table-column prop="addressString" label="所在城市" width="120"></el-table-column>
      <el-table-column label="操作"   align="center">
        <template slot-scope="scope">
          <el-button type="success" @click="handleEdit(scope.row)">编辑 <i class="el-icon-edit"></i></el-button>
          <el-popconfirm
              class="ml-5"
              confirm-button-text='确定'
              cancel-button-text='我再想想'
              icon="el-icon-info"
              icon-color="red"
              title="您确定删除吗？"
              @confirm="del(scope.row.id)"
          >
            <el-button type="danger" slot="reference">删除 <i class="el-icon-remove-outline"></i></el-button>
          </el-popconfirm>
          <template>
          <el-button type="primary" @click="handleView(scope.row)" style="margin: 5px">查看 <i class="el-icon-view"></i></el-button>
            <el-dialog  :visible.sync="showDialog" @opened="open">
              <div ref="zhe" style="width: 600px; height: 400px;"></div>
            </el-dialog>
          </template>
        </template>
      </el-table-column>
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

    <el-dialog title="设备信息" :visible.sync="dialogFormVisible" width="30%" >
      <el-form label-width="80px" size="small">
<!--        <el-form-item label="ID">-->
<!--          <el-input v-model="form.id" autocomplete="off"></el-input>-->
<!--        </el-form-item>-->
        <el-form-item label="名称">
          <el-input v-model="form.dName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="设备类型">
          <el-select v-model="form.type" placeholder="请选择">
            <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所在城市">
          <el-select v-model="form.address" placeholder="请选择">
            <el-option
                v-for="item in cityoptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="danger" @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import * as echarts from 'echarts';
export default {
  name: "Device",
  data() {
    return {
      t:["温度型设备","湿度型设备","光照型设备"],
      ci:["北京","上海","深圳","广州"],
      tableData: [],
      total: 0,
      pageNum: 1,
      pageSize: 5,
      id: "",
      dName: "",
      type:"",
      typeString:"",
      online:"在线",
      isWarning:"",
      warningString:"",
      address:"",
      addressString:"",
      form: {},
      dialogFormVisible: false,
      showDialog:false,
      multipleSelection: [],
      // 设备类型下拉菜单
      options: [{
        value: '1',
        label: '温度型设备'
      }, {
        value: '2',
        label: '湿度型设备'
      }, {
        value: '3',
        label: '光照型设备'
      }],
      cityoptions: [{
        value: '1',
        label: '北京'
      }, {
        value: '2',
        label: '上海'
      }, {
        value: '3',
        label: '广州'
      },{
        value: '4',
        label: '深圳'
      }],
      chartoptions:{
        tooltip:  {
          trigger: 'axis'
        },
        legend: {
          data: ['温度', '湿度', '光照']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        title:{
          text:'查看设备',
          subtext: '数据分析',
          left:'center'
        },
        xAxis: {
          type: 'category',
          data: ['1', '2', '3', '4', '5', '6', '7','8','9','10']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [],
            type: 'line'
          },
          {
            data: [],
            type: 'bar'
          }
        ]
      }
    }
  },
  created() {
    this.load()
  },
  methods: {
    load() {
      this.request.get("/device/page", {
        params: {
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          id: this.id,
          dName: this.dName,
          type: this.type,
        }
      }).then(res => {
        this.tableData = res.records
        this.total = res.total
        //根据type数字显示设备类型
       this.tableData.forEach(device=>{
         device.typeString =this.getTypeString(device.type);
         device.addressString =this.getCityString(device.address);
         device.warningString=this.getWaringString(device.isWarning)
       })

      })
    },
    getTypeString(type){
      return this.t[type-1];
    },
    getCityString(address){
      return this.ci[address-1];
    },
    getWaringString(isWarning){
      return !isWarning?"正常":"报警"
    },
    save() {
      this.request.post("/device", this.form).then(res => {
        if (res) {
          this.$message.success("保存成功")
          this.dialogFormVisible = false
          this.load()
        } else {
          this.$message.error("保存失败")
        }
      })
    },
    handleAdd() {
      this.dialogFormVisible = true
      this.form = {}
    },
    handleEdit(row) {
      this.form = row
      this.dialogFormVisible = true
    },
    del(id) {
      this.request.delete("/device/" + id).then(res => {
        if (res) {
          this.$message.success("删除成功")
          this.load()
        } else {
          this.$message.error("删除失败")
        }
      })
    },
    handleSelectionChange(val) {
      console.log(val)
      this.multipleSelection = val
    },
    delBatch() {
      let ids = this.multipleSelection.map(v => v.id)  // [{}, {}, {}] => [1,2,3]
      this.request.post("/device/del/batch", ids).then(res => {
        if (res) {
          this.$message.success("批量删除成功")
          this.load()
        } else {
          this.$message.error("批量删除失败")
        }
      })
    },
    reset() {
      this.id = ""
      this.dName = ""
      this.type=""
      this.load()
    },
    handleSizeChange(pageSize) {
      console.log("pagesize="+pageSize)
      this.pageSize = pageSize
      this.load()
    },
    handleCurrentChange(pageNum) {
      console.log("pagenum="+pageNum)
      this.pageNum = pageNum
      this.load()
    },
    handleExport(){
        window.open("http://localhost:80/echarts/export")
    },
    handleView(row){
      this.$message.success("查看"+row.typeString+row.dName)
      // 弹框的触发事件
        this.showDialog = true;

    },
    open(){
      this.$nextTick(() => {
        //清除
        this.$refs.zhe.removeAttribute("_echarts_instance_")
        //this.zhe.clear()
        this.chartoptions.series[0].data = []
        this.chartoptions.series[1].data = []
        this.zhe=echarts.init(this.$refs.zhe)

        this.request.get("/echarts/statistic").then(res => {
          // 填空
          // option.xAxis.data = res.data.x
          this.chartoptions.series[0].data = res.data
          this.chartoptions.series[1].data = res.data
          // 数据准备完毕之后再set
          this.zhe.setOption(this.chartoptions,true);
          // this.zhe.resize()
        })
      })
    }
  }
}
</script>


<style>
.headerBg {
  background: #eee!important;
}
</style>
