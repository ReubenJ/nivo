import React from 'react'
import { BasicTooltip } from '@nivo/tooltip'
import { ComputedDatum } from './types'

export const SwarmPlotTooltip = <RawDatum,>({
    id,
    formattedValue,
    color,
}: ComputedDatum<RawDatum>) => (
    <BasicTooltip
        id={id} //node.label
        value={formattedValue}
        enableChip={true}
        color={color}
    />
)
