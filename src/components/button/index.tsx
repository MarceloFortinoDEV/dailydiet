import { TouchableOpacity, Text } from "react-native"
import { TouchableOpacityProps } from "react-native"
import { Pencil, Plus, X } from "phosphor-react-native"

interface Props extends TouchableOpacityProps {
    icon?: 'PLUS' | 'DELETE' | 'EDIT'
    type?: 'PRIMARY' | 'SECONDARY'
    children: string
}

export function TouchableButton({ children, type = 'PRIMARY', icon, ...rest }:Props) {
    return(
        <TouchableOpacity {...rest} className={`${type === 'PRIMARY' ? ('bg-gray-900') : ('bg-transparent')} flex-row justify-center items-center border-2 border-gray-900 border-solid gap-2 mt-2 rounded-lg p-5`}>
            {icon === 'PLUS' && (<Plus color="#FFF" size={18}/>)}
            {icon === 'DELETE' && (<X color="#000000" size={18}/>)}
            {icon === 'EDIT' && (<Pencil color="#FFF" size={18}/>)}
            <Text className={`${type === 'PRIMARY' ? ('text-white') : ('text-gray-900')} font-bold`}>{children}</Text>
        </TouchableOpacity>
    )
}