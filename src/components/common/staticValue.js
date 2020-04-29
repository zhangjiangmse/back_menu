// from https://github.com/modood/Administrative-divisions-of-China
import {$getJson} from '@/http/index'

//获取JSON数据
const getPcaJSONValue = data => {
    return $getJson('./public/static/pca-code.json',data)
}
export default {
    getPcaJSONValue
}