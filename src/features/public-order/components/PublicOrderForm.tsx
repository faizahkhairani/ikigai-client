import { useForm } from '@tanstack/react-form';
import {
  ArrowRight,
  Info,
  LoaderCircle,
  Plus,
  ShieldCheck,
  Trash2,
} from 'lucide-react';
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
import { publicOrderSchema, ORDER_LIMITS, type PublicOrderFormValues } from '../schemas';
import type { SubmitPublicOrderPayload, SubmitPublicOrderResult } from '../types';
import ImagePicker from './ImagePicker';
import {inputCls} from '@/lib/styles';

const emptyItem = { name: '', qty: '1', note: '' };

const defaultValues: PublicOrderFormValues = {
  name: '',
  phone: '',
  resiThailand: '',
  resiImage: null,
  items: [{ ...emptyItem }],
};

type Props = {
  onSubmit: (payload: SubmitPublicOrderPayload) => Promise<SubmitPublicOrderResult>;
  onSuccess: (trackingToken: string) => void;
};

function SectionHeader({
  no,
  title,
  desc,
}: {
  no: string;
  title: string;
  desc: string;
}) {
  return (
    <header className="mb-6">
      <p className="text-[11px] font-medium tracking-[0.2em] text-rose-400">
        {no}
      </p>
      <h2 className="mt-1 font-serif text-xl text-stone-900">{title}</h2>
      <p className="mt-1 text-sm text-stone-500">{desc}</p>
    </header>
  );
}

const PublicOrderForm = ({ onSubmit, onSuccess }: Props) => {
  const form = useForm({
    defaultValues,
    validators: { onSubmit: publicOrderSchema },
    onSubmit: async ({ value }) => {
      if (!value.resiImage) return; // sudah dijaga schema, ini buat TypeScript

      try {
        const result = await onSubmit({
          name: value.name.trim(),
          phone: value.phone.trim(),
          resiThailand: value.resiThailand.trim(),
          image: value.resiImage,
          items: value.items.map((item) => ({
            name: item.name.trim(),
            qty: Number(item.qty),
            note: item.note.trim() || undefined,
          })),
        });
        onSuccess(result.trackingToken);
      } catch (err: any) {
        toast.add({
          type: 'error',
          description: err.response?.data?.error ?? 'Gagal mengirim order',
          priority: 'high',
        });
      }
    },
  });

  
return (
 <form
  onSubmit={(e) => {
    e.preventDefault();
    e.stopPropagation();
    form.handleSubmit();
  }}
  className="rounded-3xl bg-white p-5 shadow-[0_1px_2px_rgba(28,25,23,0.04),0_12px_32px_-12px_rgba(28,25,23,0.08)] ring-1 ring-stone-200/70 sm:p-8"
>
  {/* Intro */}
  <aside className="mb-8 flex items-start gap-3 border-l-2 border-rose-300 bg-rose-50/40 py-2.5 pl-4 pr-3">
    <Info className="mt-0.5 size-4 shrink-0 text-rose-400" />
    <p className="text-xs leading-5 text-stone-600">
      <span className="font-medium text-stone-900">Tips tracking: </span>
      Setelah order berhasil dikirim, kamu akan menerima tracking token untuk
      melacak pesanan. Jika token hilang, kamu tetap bisa menggunakan nomor
      resi atau nomor telepon.
    </p>
  </aside>

  <FieldGroup>
    <div className="divide-y divide-stone-200/80">
      {/* 01 — Informasi pemesan */}
      <section className="pb-8">
        <SectionHeader
          no="01"
          title="Informasi pemesan"
          desc="Kontak yang bisa dihubungi untuk pesananmu."
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <form.Field name="name">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Nama lengkap</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    placeholder="Masukkan nama lengkap"
                    className={inputCls}
                    maxLength={ORDER_LIMITS.name}
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>

          <form.Field name="phone">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Nomor WhatsApp</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    type="tel"
                    inputMode="tel"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    placeholder="08xxxxxxxxxx"
                    className={inputCls}
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>
        </div>
      </section>

      {/* 02 — Informasi paket */}
      <section className="py-8">
        <SectionHeader
          no="02"
          title="Informasi paket"
          desc="Detail paket yang dikirim ke gudang Thailand."
        />

        <div className="space-y-5">
          <form.Field name="resiThailand">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Nomor resi paket</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    placeholder="Masukkan nomor resi"
                    className={inputCls}
                    maxLength={ORDER_LIMITS.resi}
                  />
                  <FieldDescription>
                    Gunakan nomor resi dari kurir atau marketplace.
                  </FieldDescription>
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>

          <form.Field name="resiImage">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Foto bukti resi</FieldLabel>
                  <ImagePicker
                    id={field.name}
                    file={field.state.value}
                    onChange={field.handleChange}
                    isInvalid={isInvalid}
                  />
                  <FieldDescription>
                    Unggah foto resi atau struk paket, maksimal 2 MB.
                  </FieldDescription>
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>
        </div>
      </section>

      {/* 03 — Barang titipan */}
      <form.Field name="items" mode="array">
        {(itemsField) => (
          <section className="py-8">
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-[11px] font-medium tracking-[0.2em] text-rose-400">
                  03
                </p>
                <h2 className="mt-1 font-serif text-xl text-stone-900">
                  Barang titipan
                </h2>
                <p className="mt-1 text-sm text-stone-500">
                  Tambahkan barang yang ingin kamu pesan.
                </p>
              </div>

              <Button
                type="button"
                variant="outline"
                size="sm"
                disabled={itemsField.state.value.length >= ORDER_LIMITS.maxItems}
                onClick={() => itemsField.pushValue({ ...emptyItem })}
              >
                <Plus className="mr-1.5 size-4" />
                Tambah barang
              </Button>
            </div>

            <div className="space-y-3">
              {itemsField.state.value.map((_, index) => (
                <div
                  key={index}
                  className="rounded-2xl bg-stone-50/80 p-4 ring-1 ring-stone-200/70"
                >
                  <div className="mb-4 flex items-center justify-between">
                    <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-stone-400">
                      Barang {String(index + 1).padStart(2, "0")}
                    </span>

                    {itemsField.state.value.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        aria-label={`Hapus barang ${index + 1}`}
                        className="size-8 rounded-full text-stone-400 hover:bg-rose-50 hover:text-rose-600"
                        onClick={() => itemsField.removeValue(index)}
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    )}
                  </div>

                  <div className="space-y-4">
                    <div className="grid grid-cols-[minmax(0,1fr)_76px] gap-3">
                      <form.Field name={`items[${index}].name`}>
                        {(field) => {
                          const isInvalid =
                            field.state.meta.isTouched &&
                            !field.state.meta.isValid;
                          return (
                            <Field data-invalid={isInvalid}>
                              <FieldLabel>Nama barang</FieldLabel>
                              <Input
                                aria-label="Nama barang"
                                placeholder="Contoh: Cardigan"
                                value={field.state.value}
                                onBlur={field.handleBlur}
                                onChange={(e) =>
                                  field.handleChange(e.target.value)
                                }
                                aria-invalid={isInvalid}
                                className={inputCls}
                                maxLength={ORDER_LIMITS.itemName}
                              />
                              {isInvalid && (
                                <FieldError errors={field.state.meta.errors} />
                              )}
                            </Field>
                          );
                        }}
                      </form.Field>

                      <form.Field name={`items[${index}].qty`}>
                        {(field) => {
                          const isInvalid =
                            field.state.meta.isTouched &&
                            !field.state.meta.isValid;
                          return (
                            <Field data-invalid={isInvalid}>
                              <FieldLabel>Jumlah</FieldLabel>
                              <Input
                                aria-label="Jumlah"
                                type="number"
                                inputMode="numeric"
                                min={1}
                                value={field.state.value}
                                onBlur={field.handleBlur}
                                onChange={(e) =>
                                  field.handleChange(e.target.value)
                                }
                                aria-invalid={isInvalid}
                                className={inputCls}
                              />
                              {isInvalid && (
                                <FieldError errors={field.state.meta.errors} />
                              )}
                            </Field>
                          );
                        }}
                      </form.Field>
                    </div>

                    <form.Field name={`items[${index}].note`}>
                      {(field) => (
                        <Field>
                          <FieldLabel>
                            Catatan{" "}
                            <span className="font-normal text-stone-400">
                              (opsional)
                            </span>
                          </FieldLabel>
                          <Input
                            aria-label="Catatan barang"
                            placeholder="Ukuran, warna, atau detail lainnya"
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(e.target.value)}
                            className={inputCls}
                            maxLength={ORDER_LIMITS.itemNote}
                          />
                        </Field>
                      )}
                    </form.Field>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 flex items-baseline justify-between border-t border-dashed border-stone-300 pt-4">
              <span className="text-sm text-stone-500">Total jenis barang</span>
              <span className="font-serif text-lg text-stone-900">
                {itemsField.state.value.length}{" "}
                <span className="font-sans text-sm text-stone-500">barang</span>
              </span>
            </div>
          </section>
        )}
      </form.Field>
    </div>

    {/* Submit */}
    <div className="space-y-4">
      <div className="flex items-start gap-2.5">
        <ShieldCheck className="mt-0.5 size-4 shrink-0 text-stone-400" />
        <p className="text-xs leading-5 text-stone-500">
          Pastikan nomor resi dan informasi barang sudah benar sebelum mengirim
          pesanan.
        </p>
      </div>

      <form.Subscribe selector={(state) => state.isSubmitting}>
        {(isSubmitting) => (
          <Button
            type="submit"
            disabled={isSubmitting}
            className="group h-10 w-full rounded-full bg-stone-900 text-sm font-medium text-white shadow-lg shadow-stone-900/10 transition-all hover:bg-stone-800 disabled:opacity-60"
          >
            {isSubmitting ? (
              <>
                <LoaderCircle className="mr-2 size-4 animate-spin" />
                Mengirim pesanan...
              </>
            ) : (
              <>
                Kirim order
                <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-0.5" />
              </>
            )}
          </Button>
        )}
      </form.Subscribe>
    </div>
  </FieldGroup>
</form>
);

};

export default PublicOrderForm;