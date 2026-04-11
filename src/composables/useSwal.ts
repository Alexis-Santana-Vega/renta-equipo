import Swal, { type SweetAlertIcon, type SweetAlertOptions } from 'sweetalert2';
/**
 * Devuelve `{ target: el }` solo si hay un elemento en pantalla completa activo.
 * Si no, devuelve `{}` para que SweetAlert use su default ("body") sin advertencias.
 */
const getFullscreenConfig = (): Pick<SweetAlertOptions, 'target'> | object => {
  const el = document.fullscreenElement;
  return el ? { target: el as HTMLElement } : {};
};

export const useSwal = () => {
  const toast = (icon: SweetAlertIcon = 'success', title?: string) => {
    return Swal.fire({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3500,
      timerProgressBar: true,
      icon: icon,
      title: title,
      ...getFullscreenConfig(),
      didOpen: e => {
        const bar = e.querySelector<HTMLElement>('.swal2-timer-progress-bar');
        if (bar) bar.style.backgroundColor = `rgb(var(--v-theme-${icon}))`;
        e.addEventListener('mouseenter', () => Swal.stopTimer());
        e.addEventListener('mouseleave', () => Swal.resumeTimer());
      },
    });
  };

  const confirm = (title: string, icon: SweetAlertIcon = 'warning', text?: string) => {
    return Swal.fire({
      title: title,
      text: text,
      icon: icon,
      ...getFullscreenConfig(),
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true,
    });
  };

  return {
    toast,
    confirm,
  };
};
