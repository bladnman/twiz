import TWEvent from '@classes/data/TWEvent.ts';
import SummaryRow from '@features/inspector-panel/features/details-summary-viewer/common/SummaryRow.tsx';
import { StackProps, VStack } from '@common/mui-stacks.tsx';
import { TypographyStyleOptions } from '@mui/material/styles/createTypography';

export type SummaryTableRowDef = Partial<FieldDefinition> & {
  // from FIELD_DEF
  field: string;
  paths?: string[];
  // for summary table
  alwaysShow?: boolean;
  isKeyField?: boolean;
  color?: string;
  value?: string; // optional value to override any mapping
};
export default function SummaryTable({
  event,
  rowDefs,
  stackOptions,
}: {
  event: TWEvent;
  rowDefs: SummaryTableRowDef[];
  stackOptions?: Partial<StackProps>;
}) {
  return (
    <VStack hFill topLeft {...stackOptions}>
      {rowDefs.map((rowDef) => {
        const value = rowDef.value ?? event.getStr((rowDef as FieldDefinition).paths);
        const labelSx: TypographyStyleOptions = {};
        const valueSx: TypographyStyleOptions = {
          color: rowDef.color ?? 'text.primary',
        };
        if (!value && !rowDef.alwaysShow) {
          return null;
        }
        return (
          <SummaryRow
            key={rowDef.field}
            label={rowDef.field}
            value={value}
            labelSx={labelSx}
            valueSx={valueSx}
            stackOptions={{
              hFill: true,
              topLeft: true,
              ...stackOptions,
            }}
          />
        );
      })}
    </VStack>
  );
}
