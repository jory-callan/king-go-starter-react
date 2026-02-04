import { DynamicIcon, dynamicIconImports, type IconName } from "lucide-react/dynamic";
import type { ComponentProps } from "react";

// 1 使用 ComponentProps<typeof DynamicIcon> 来获取原始组件的所有属性类型
// 2 使用 Omit<DynamicIconProps, "name"> 来排除我们自定义的 name属性

// 提取 DynamicIcon 的所有属性类型
type DynamicIconProps = ComponentProps<typeof DynamicIcon>;
// 此组件的属性类型,排除 name 属性，再添加 name 属性
interface LucideDynamicIconProps extends Omit<DynamicIconProps, "name"> {
  name: string; // 运行时接受任意字符串
}

export default function LucideDynamicIcon({ name, ...props }: LucideDynamicIconProps) {
  // 如果 不是 IconName 里面的类型
  if (!(name in dynamicIconImports)) {
    name = "circle"; // 默认值
  }
  return <DynamicIcon name={name as IconName} {...props} />;
}
