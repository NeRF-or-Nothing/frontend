import { Notification, rem } from '@mantine/core';

interface NotificationSystemProps {
  notification: { message: string; type: 'success' | 'error' | 'info' } | null;
  onClose: () => void;
}

export function NotificationSystem({ notification, onClose }: NotificationSystemProps) {
  if (!notification) return null;

  return (
    <Notification
      title={notification.type === 'error' ? 'Error' : notification.type === 'success' ? 'Success' : 'Info'}
      color={notification.type === 'error' ? 'red' : notification.type === 'success' ? 'green' : 'blue'}
      onClose={onClose}
      style={{ position: 'fixed', bottom: rem(20), right: rem(20) }}
    >
      {notification.message}
    </Notification>
  );
}