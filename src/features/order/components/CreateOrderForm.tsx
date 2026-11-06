import { useForm } from '@tanstack/react-form';
import { Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/toast';
import type { Batch } from '@/features/batch/type';
import { createOrderSchema, type CreateOrderFormValues } from '../schemas';
import type { CreateManualOrderPayload } from '../types';
import OptionSelect from './OptionSelect';
import { ORDER_LIMITS } from '../schemas';

const emptyItem = { name: '', qty: '1', note: '' };

const defaultValues: CreateOrderFormValues = {
  name: '',
  phone: '',
  resiThailand: '',
  batchId: '',
  items: [{ ...emptyItem }],
};

type Props = {
  batches: Batch[];
  onSubmit: (payload: CreateManualOrderPayload) => Promise<unknown>;
  onSuccess: () => void;
  onFailure?: () => void; // opsional, kalau mau nutup dialog juga pas gagal submit
};

const CreateOrderForm = ({ batches, onSubmit, onSuccess, onFailure }: Props) => {
  const form = useForm({
    defaultValues,
    validators: { onSubmit: createOrderSchema },
    onSubmit: async ({ value }) => {
      try {
        await onSubmit({
          name: value.name.trim(),
          phone: value.phone.trim(),
          resiThailand: value.resiThailand.trim(),
          batchId: value.batchId || undefined, // kosong -> backend pakai batch aktif
          items: value.items.map((item) => ({
            name: item.name.trim(),
            qty: Number(item.qty),
            note: item.note.trim() || undefined,
          })),
        });
        toast.add({ type: 'success', description: 'Order berhasil dibuat.' });
        onSuccess(); // nutup dialog
      } catch (err: any) {
        toast.add({
          type: 'error',
          description: err.response?.data?.error ?? 'Gagal membuat order',
          priority: 'high',
        });
        onFailure?.(); // kalau ada, nutup dialog juga pas gagal submit
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
        <div className="grid grid-cols-2 gap-4">
          <form.Field name="name">
            {(field) => {
              const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Nama customer</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    placeholder="Budi"
                    maxLength={ORDER_LIMITS.name}
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
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    placeholder="08123456789"
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>
        </div>

        <form.Field name="resiThailand">
          {(field) => {
            const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>No resi Thailand</FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  aria-invalid={isInvalid}
                  placeholder="cth: TH1234567890"
                  maxLength={ORDER_LIMITS.resi}
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        </form.Field>

        <form.Field name="batchId">
          {(field) => (
            <Field>
              <FieldLabel>Batch</FieldLabel>
              <OptionSelect
                className="w-full"
                emptyLabel="Batch aktif (otomatis)"
                value={field.state.value || undefined}
                options={batches.map((batch) => ({
                  value: batch.id,
                  label: batch.status === 'closed' ? `${batch.name} (ditutup)` : batch.name,
                }))}
                onChange={(value) => field.handleChange(value ?? '')}
              />
              <FieldDescription>
                Kosongkan buat masuk ke batch yang lagi aktif. Pilih batch lain kalau mau
                mencatat order ke batch yang sudah ditutup.
              </FieldDescription>
            </Field>
          )}
        </form.Field>

        {/* mode="array" bikin field ini punya pushValue / removeValue buat daftar barang */}
        <form.Field name="items" mode="array">
          {(itemsField) => (
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Barang</span>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  disabled={itemsField.state.value.length >= ORDER_LIMITS.maxItems}
                  onClick={() => itemsField.pushValue({ ...emptyItem })}
                >
                  <Plus />
                  Tambah barang
                </Button>
              </div>

              {itemsField.state.value.map((_, index) => (
                <div key={index} className="grid grid-cols-[1fr_5rem_1fr_auto] items-start gap-2">
                  <form.Field name={`items[${index}].name`}>
                    {(field) => {
                      const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                      return (
                        <Field data-invalid={isInvalid}>
                          <Input
                            aria-label="Nama barang"
                            placeholder="Nama barang"
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(e.target.value)}
                            aria-invalid={isInvalid}
                            maxLength={ORDER_LIMITS.itemName}
                          />
                          {isInvalid && <FieldError errors={field.state.meta.errors} />}
                        </Field>
                      );
                    }}
                  </form.Field>

                  <form.Field name={`items[${index}].qty`}>
                    {(field) => {
                      const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                      return (
                        <Field data-invalid={isInvalid}>
                          <Input
                            aria-label="Jumlah"
                            type="number"
                            min={1}
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

                  <form.Field name={`items[${index}].note`}>
                    {(field) => (
                      <Input
                        aria-label="Catatan"
                        placeholder="Catatan (opsional)"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        maxLength={ORDER_LIMITS.itemNote}
                      />
                    )}
                  </form.Field>

                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    aria-label="Hapus barang"
                    disabled={itemsField.state.value.length === 1} // minimal 1 barang
                    onClick={() => itemsField.removeValue(index)}
                  >
                    <Trash2 />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </form.Field>

        <form.Subscribe selector={(state) => state.isSubmitting}>
          {(isSubmitting) => (
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Menyimpan...' : 'Simpan Order'}
            </Button>
          )}
        </form.Subscribe>
      </FieldGroup>
    </form>
  );
};

export default CreateOrderForm;