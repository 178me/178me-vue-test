import {
  defineComponent,
  PropType,
  computed,
  defineProps,
  onMounted,
  ref,
  watchEffect,
} from "vue"
import type { BoxInfo } from "~/types"
import { ByteUnitConvert } from "~/utils/index"
import avatarSvg from "~/assets/头像.svg"
import memberSvg from "~/assets/设备入口/成员.svg"
import applicationSvg from "~/assets/设备入口/应用.svg"
import messageSvg from "~/assets/设备入口/消息.svg"
import boxPNG from "~/assets/设备入口/盒子.png"

const deviceInfoProps = {
  box: {
    type: Object as PropType<BoxInfo>,
  },
}

const BoxInfoCount = defineComponent({
  props: {
    svg: String as PropType<string>,
    content: String as PropType<string>,
    count: Number as PropType<number>,
    hdl: Function as PropType<Function>,
  },
  setup(props) {
    return () => (
      <div
        flex="~ row "
        class="space-x-6px"
        text="12px"
        onClick={() => {
	  props.hdl && props.hdl()
        }}>
        <img class="h-16px w-16px" src={props.svg} />
        <span>
          {props.count}
          {props.content}
        </span>
      </div>
    )
  },
})

const BoxStatusMark = defineComponent({
  props: {
    status: Number as PropType<number>,
  },
  setup(props) {
    return (
      <div bg="#2EC1CC/10" rounded-full p-2px>
        <div rounded-full w-5px h-5px bg="#2EC1CC" />
      </div>
    )
  },
})

const DeviceCard = defineComponent({
  props: {
    box: Object as PropType<BoxInfo>,
  },
  setup(props) {
    // 计算进度条值
    const calcProgressValue = computed(() => {
      let progressVal =
        (props.box?.usedSize.valueOf() / props.box?.maxSize.valueOf()) * 100
      if (progressVal <= 100) {
        return progressVal
          ? `width: ${progressVal}%`
          : `width: ${progressVal}%; display: none;`
      }
      return "width: 0"
    })
    // 计算磁盘使用空间模板内容
    const calcUsedSizeTemplate = computed(() => {
      return (
        ByteUnitConvert(props.box?.usedSize) +
        "/" +
        ByteUnitConvert(props.box?.maxSize)
      )
    })
    const BoxInfoCountArr = ref([])
    watchEffect(() => {
      BoxInfoCountArr.value = [
        {
          svg: memberSvg,
          count: props.box?.members,
          content: "个成员",
        },
        {
          svg: applicationSvg,
          count: props.box?.appCount,
          content: "个应用",
          hdl: () => {
            const boxdomain = window.location.href.split(".")[1]
            window.open(`https://home.${boxdomain}.heiyu.space`)
          },
        },
        {
          svg: messageSvg,
          count: props.box?.messages || 0,
          content: "个消息",
        },
      ]
    })
    return () => (
      <div
        class="bg-#212943 rounded-3 ~ col bg-gradient-to-r from-[#212943] to-[#484E67]"
        flex="~ col"
        text="12px #FFFFFF"
        p-3>
        <div flex="~ grow col" p="t-10px x-10px">
          <div flex="~ row" class="justify-between" space-x-5px>
            <div flex="~ row" class="space-x-5px">
              <img class="h-20px w-20px rounded-full" src={avatarSvg} />
              <span text="12px bold" class="mx-auto my-auto">
                设备号: {props.box?.id}
              </span>
            </div>
            <div
              bg="#FFFFFF/4"
              flex="~ row"
              class="items-center rounded-full px[12px] py-[3px] space-x-[3px]">
              <div bg="#2EC1CC/10" class="w-9px h-9px rounded-full p-2px">
                <div class="rounded-full w-5px h-5px" bg="#2EC1CC" />
              </div>
              <span text="#D8D8D8" class="align-middle">
                已连接
              </span>
            </div>
          </div>
          {/*中间部分*/}
          <div flex="~ row" class="h-85px" p="y-20px">
            <img src={boxPNG} class="mr-12px w-80px h-32px mx-auto my-auto" />
            <div flex="~ col grow" class="col-span-2 mx-auto my-auto">
              <span text="16px" font="semibold" class="truncate">
                懒猫云 {props.box?.name}
              </span>

              <div class="flex w-full flex-row items-center space-x-[3px] px-[3px]">
                <div class="h-[8px] grow rounded-[4px] p-[1px]" bg="black/30">
                  <div
                    class="flex h-full flex-row"
                    style={calcProgressValue.value}>
                    <div class="h-full rounded-tl rounded-bl bg-#2EC1CC grow"></div>
                    <div
                      class="h-full rounded-tr rounded-br bg-#2EC1CC"
                      style="width: 4px; box-shadow: 0 0 10px 2px #2ec1cc"></div>
                  </div>
                </div>
                <span class="inline-block align-text-bottom text-[9px] text-white/50">
                  {calcUsedSizeTemplate.value}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div
          class="w-full justify-evenly p-12px rounded-b-3"
          bg="black/10"
          flex="~ row"
          text="#FFFFFF">
          {BoxInfoCountArr.value.map((data, i) => {
            console.log("data:", data)
            return (
              <>
                <BoxInfoCount
                  svg={data.svg}
                  count={data.count}
                  content={data.content}
                  hdl={data.hdl}
                />
                {/* 分割线 */
                /* 最后一个不需要渲染分割线 */}
                {i + 1 !== BoxInfoCountArr.length && (
                  <span class="h-[16px] w-[1px] bg-[#E7E7E7]/20" />
                )}
              </>
            )
          })}
        </div>
      </div>
    )
  },
})

export default DeviceCard
