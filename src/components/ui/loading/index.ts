import { cva, type VariantProps } from 'class-variance-authority'

export { default as Loading } from './Loading.vue'

export const loadingVariants = cva(
  'text-gray-200 animate-spin',
  {
    variants: {
      variant: {
        default:
          'fill-primary',
      },
      size: {
        default: 'w-8 h-8',
        sm: 'w-4 h-4',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export type LoadingVariants = VariantProps<typeof loadingVariants>
