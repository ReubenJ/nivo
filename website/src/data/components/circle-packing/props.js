import { defaultProps } from '@nivo/circle-packing'
import {
    themeProperty,
    motionProperties,
    defsProperties,
    groupProperties,
} from '../../../lib/componentProperties'

const props = [
    {
        key: 'data',
        group: 'Base',
        help: 'Chart data, which should be immutable.',
        description: `
            Chart data, which must conform to this structure
            if using the default \`id\` and \`value\` accessors:

            \`\`\`
            {
                // must be unique for the whole dataset
                id: string | number
                value: number
                children: {
                    id: string | number
                    value: number
                    children: ...
                }[]
            }
            \`\`\`

            If using a different data structure, you must make sure
            to adjust both \`id\` and \`value\`. Meaning you can provide
            a completely different data structure as long as \`id\` and \`value\`
            return the appropriate values.

            Immutability of the data is important as re-computations
            depends on it.
        `,
        type: 'object',
        required: true,
    },
    {
        key: 'id',
        group: 'Base',
        help: 'Id accessor.',
        description: `
            define id accessor, if string given,
            will use \`node[value]\`,
            if function given, it will be invoked
            for each node and will receive the node as
            first argument, it must return the node
            id (string | number).
        `,
        type: 'string | Function',
        required: false,
        defaultValue: defaultProps.id,
    },
    {
        key: 'value',
        group: 'Base',
        help: 'Value accessor',
        description: `
            define value accessor, if string given,
            will use \`node[value]\`,
            if function given, it will be invoked
            for each node and will receive the node as
            first argument, it must return the node
            value (number).
        `,
        type: 'string | Function',
        required: false,
        defaultValue: defaultProps.value,
    },
    {
        key: 'padding',
        help: 'Padding between each circle.',
        description: `
            Padding between adjacent circles.
            Please be aware that when zoomed
            this value will be affected by the zooming factor
            and is expressed in pixels. See the
            [official d3 documentation](https://github.com/d3/d3-hierarchy#pack_padding).
        `,
        type: 'number',
        required: false,
        defaultValue: defaultProps.padding,
        controlType: 'range',
        group: 'Base',
        controlOptions: {
            unit: 'px',
            min: 0,
            max: 32,
        },
    },
    {
        key: 'leavesOnly',
        help: 'Only render leaf nodes (skip parent nodes).',
        type: 'boolean',
        required: false,
        defaultValue: defaultProps.leavesOnly,
        controlType: 'switch',
        group: 'Base',
    },
    {
        key: 'width',
        enableControlForFlavors: ['api'],
        help: 'Chart width.',
        description: `
            not required if using \`<ResponsiveCirclePacking/>\`.
        `,
        type: 'number',
        required: true,
        controlType: 'range',
        group: 'Base',
        controlOptions: {
            unit: 'px',
            min: 100,
            max: 1000,
            step: 5,
        },
    },
    {
        key: 'height',
        enableControlForFlavors: ['api'],
        help: 'Chart height.',
        description: `
            not required if using \`<ResponsiveCirclePacking/>\`.
        `,
        type: 'number',
        required: true,
        controlType: 'range',
        group: 'Base',
        controlOptions: {
            unit: 'px',
            min: 100,
            max: 1000,
            step: 5,
        },
    },
    {
        key: 'margin',
        help: 'Chart margin.',
        type: 'object',
        required: false,
        controlType: 'margin',
        group: 'Base',
    },
    {
        key: 'pixelRatio',
        flavors: ['canvas'],
        help: `Adjust pixel ratio, useful for HiDPI screens.`,
        required: false,
        defaultValue: 'Depends on device',
        type: `number`,
        controlType: 'range',
        group: 'Base',
        controlOptions: {
            min: 1,
            max: 2,
        },
    },
    themeProperty,
    {
        key: 'colors',
        help: 'Defines how to compute node color.',
        description: `
            colors used to colorize the circles,
            [see dedicated documentation](self:/guides/colors).
        `,
        type: 'string | Function | string[]',
        required: false,
        defaultValue: { scheme: 'nivo' },
        controlType: 'ordinalColors',
        group: 'Style',
    },
    {
        key: 'childColor',
        help: 'Defines how to compute child nodes color.',
        type: 'string | object | Function',
        required: false,
        defaultValue: defaultProps.childColor,
        controlType: 'inheritedColor',
        group: 'Style',
    },
    {
        key: 'borderWidth',
        help: 'Width of circle border.',
        type: 'number',
        required: false,
        defaultValue: defaultProps.borderWidth,
        controlType: 'lineWidth',
        group: 'Style',
    },
    {
        key: 'borderColor',
        help: 'Method to compute border color.',
        description: `
            how to compute border color,
            [see dedicated documentation](self:/guides/colors).
        `,
        type: 'string | object | Function',
        required: false,
        defaultValue: defaultProps.borderColor,
        controlType: 'inheritedColor',
        group: 'Style',
    },
    ...defsProperties('Style', ['svg']),
    {
        key: 'enableLabels',
        help: 'Enable/disable labels.',
        type: 'boolean',
        required: false,
        defaultValue: defaultProps.enableLabels,
        controlType: 'switch',
        group: 'Labels',
    },
    {
        key: 'label',
        help: 'Label accessor.',
        description: `
            Defines how to get label text,
            can be a string (used to access current node data property)
            or a function which will receive the actual node data.
        `,
        type: 'string | Function',
        required: false,
        defaultValue: defaultProps.label,
        controlType: 'choices',
        group: 'Labels',
        controlOptions: {
            choices: ['id', 'value', `d => \`\${d.id}: \${d.value}\``].map(choice => ({
                label: choice,
                value: choice,
            })),
        },
    },
    {
        key: 'labelsSkipRadius',
        help: 'Skip label rendering if node radius is lower than given value, 0 to disable.',
        type: 'number',
        required: false,
        defaultValue: defaultProps.labelsSkipRadius,
        controlType: 'range',
        group: 'Labels',
        controlOptions: {
            unit: 'px',
            min: 0,
            max: 32,
        },
    },
    {
        key: 'labelsTextColor',
        help: 'Method to compute label text color.',
        description: `
            how to compute label text color,
            [see dedicated documentation](self:/guides/colors).
        `,
        type: 'string | object | Function',
        required: false,
        defaultValue: defaultProps.labelsTextColor,
        controlType: 'inheritedColor',
        group: 'Labels',
    },
    {
        key: 'isInteractive',
        flavors: ['svg', 'html'],
        help: 'Enable/disable interactivity.',
        type: 'boolean',
        required: false,
        defaultValue: defaultProps.isInteractive,
        controlType: 'switch',
        group: 'Interactivity',
    },
    {
        key: 'isZoomable',
        flavors: ['svg', 'html'],
        help: `Enable/disable zooming ('isInteractive' must also be 'true').`,
        type: 'boolean',
        required: false,
        defaultValue: defaultProps.isZoomable,
        controlType: 'switch',
        group: 'Interactivity',
    },
    {
        key: 'onClick',
        group: 'Interactivity',
        flavors: ['svg', 'html'],
        help: 'onClick handler, it receives clicked node data and mouse event.',
        type: 'Function',
        required: false,
    },
    ...motionProperties(['svg', 'html'], defaultProps, 'react-spring'),
]

export const groups = groupProperties(props)
