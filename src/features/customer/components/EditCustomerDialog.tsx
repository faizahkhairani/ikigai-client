import { useForm } from '@tanstack/react-form';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/toast';
import { ORDER_LIMITS } from '@/features/order/schemas';
import { useCustomerActions } from '../hooks/useCustomerActions';
import { ADDRESS_MAX, customerSchema, type CustomerFormValues } from '../schemas';
import type { Customer } from '../types';

type FormProps = {
  customer: Customer;
  onDone: () => void;
};

const EditCustomerForm = ({ customer, onDone }: FormProps) => {
  const { update } = useCustomerActions();

  const defaultValues: CustomerFormValues = {
    name: customer.name,
    phone: customer.phone,
    address: customer.address ?? '',
  };

  const form = useForm({
    defaultValues,
    validators: { onSubmit: customerSchema },
    onSubmit: async ({ value }) => {
      try {
        await update.mutateAsync({
          id: customer.id,
          payload: {
            name: value.name.trim(),
            phone: value.phone.trim(),
            address: value.address.trim(),
          },
        });
        toast.add({ type: 'success', description: 'Data customer diperbarui.' });
        onDone();
      } catch (err: any) {
        toast.add({
          type: 'error',
          description: err.response?.data?.error ?? 'Gagal menyimpan data customer',
          priority: 'high',
        });
      }
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <FieldGroup>
        <form.Field name="name">
          {(field) => {
            const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Nama</FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  maxLength={ORDER_LIMITS.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  aria-invalid={isInvalid}
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        </form.Field>

        <form.Field name="phone">
          {(field) => {
            const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>No WA</FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  inputMode="tel"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  aria-invalid={isInvalid}
                />
                <FieldDescription>
                  Dipakai untuk mengenali customer yang order ulang. Nomor yang sudah dipakai
                  customer lain akan ditolak.
                </FieldDescription>
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        </form.Field>

        <form.Field name="address">
          {(field) => {
            const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Alamat</FieldLabel>
                <Textarea
                  id={field.name}
                  name={field.name}
                  maxLength={ADDRESS_MAX}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  aria-invalid={isInvalid}
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        </form.Field>

        <form.Subscribe selector={(state) => state.isSubmitting}>
          {(isSubmitting) => (
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Menyimpan...' : 'Simpan'}
            </Button>
          )}
        </form.Subscribe>
      </FieldGroup>
    </form>
  );
};

type Props = {
  customer: Customer | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const EditCustomerDialog = ({ customer, open, onOpenChange }: Props) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Edit customer</DialogTitle>
        <DialogDescription>Perubahan juga tampil di semua order customer ini.</DialogDescription>
      </DialogHeader>

      {/* key = id customer, biar isian terisi ulang kalau pindah ke customer lain */}
      {customer && (
        <EditCustomerForm key={customer.id} customer={customer} onDone={() => onOpenChange(false)} />
      )}
    </DialogContent>
  </Dialog>
);

export default EditCustomerDialog;