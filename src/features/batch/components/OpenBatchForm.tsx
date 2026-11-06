import { useState } from 'react';
import { useForm } from '@tanstack/react-form';
import { Button } from '@/components/ui/button';
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { toast } from '@/components/ui/toast';
import { Input } from '@/components/ui/input';
import { openBatchSchema, type OpenBatchFormValues } from '../schema';
import type { OpenBatchPayload } from '../type';

type Props = {
  onSubmit: (payload: OpenBatchPayload) => Promise<unknown>;
  onSuccess: () => void;
  onFailure: () => void;
};

const defaultValues: OpenBatchFormValues = {
  name: '',
  startDate: '',
  endDate: '',
  quota: '',
};

const OpenBatchForm = ({ onSubmit, onSuccess, onFailure }: Props) => {
  const [serverError, setServerError] = useState<string | null>(null);

  const form = useForm({
    defaultValues,
    validators: { onSubmit: openBatchSchema },
    onSubmit: async ({ value }) => {
      setServerError(null);
      try {
        await onSubmit({
          name: value.name.trim(),
          startDate: value.startDate,
          endDate: value.endDate || undefined, 
          quota: value.quota ? Number(value.quota) : undefined
        });
        toast.add({
          type: 'success',
          description: 'Batch berhasil dibuka dan siap menerima order.',
        });
        onSuccess();
      } catch (err: any) {
        toast.add({
          type: 'error',
          description: err.response?.data?.error ?? 'Gagal membuka batch',
          priority: 'high',
        });
        onFailure?.()
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
                <FieldLabel htmlFor={field.name}>Nama batch</FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  aria-invalid={isInvalid}
                  placeholder="Batch 1"
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        </form.Field>

        <form.Field name="startDate">
          {(field) => {
            const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Tanggal mulai</FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  type="date"
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

        <form.Field name="endDate">
          {(field) => {
            const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Target selesai (opsional)</FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  type="date"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  aria-invalid={isInvalid}
                />
                <FieldDescription>
                  Cuma estimasi, batch tetap bisa ditutup kapan saja.
                </FieldDescription>
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        </form.Field>
        
        <form.Field name="quota">
          {(field) => {
            const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Kuota Batch</FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  type="number"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  aria-invalid={isInvalid}
                  placeholder="100 kg"
                />
                <FieldDescription>
                  Cuma estimasi, batch tetap bisa ditutup kapan saja.
                </FieldDescription>
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        </form.Field>

        {serverError && <FieldError>{serverError}</FieldError>}

        {/* Subscribe = "dengerin" satu bagian state form, di sini status lagi submit atau nggak */}
        <form.Subscribe selector={(state) => state.isSubmitting}>
          {(isSubmitting) => (
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Membuka...' : 'Buka Batch'}
            </Button>
          )}
        </form.Subscribe>
      </FieldGroup>
    </form>
  );
};

export default OpenBatchForm;