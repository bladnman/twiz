import { Dialog, useMediaQuery, useTheme } from '@mui/material';
import useSettingsStore from '@store/settings-store/useSettingsStore.ts';
import actionSetIsTagEditorDialogOpen from '@store/settings-store/actions/actionSetIsTagEditorDialogOpen.ts';
import TagEditorProvider from '@dialogs/tag-editor-dialog/parts/TagEditorProvider.tsx';
import useTagConfigForEdit from '@dialogs/tag-editor-dialog/hooks/useTagConfigForEdit.ts';
import TagMainEditor from '@dialogs/tag-editor-dialog/features/TagMainEditor.tsx';

export default function TagEditorDialog() {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const isTagEditorDialogOpen = useSettingsStore((state) => state.isTagEditorDialogOpen);
  const tagConfig = useTagConfigForEdit();
  if (!tagConfig) return null;

  return (
    <TagEditorProvider tagConfig={tagConfig}>
      <Dialog
        open={isTagEditorDialogOpen}
        maxWidth={'md'}
        fullScreen={fullScreen}
        onClose={() => actionSetIsTagEditorDialogOpen(false)}
      >
        <TagMainEditor />
      </Dialog>
    </TagEditorProvider>
  );
}
