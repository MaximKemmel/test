import { usePopupTargetStore } from "@/store/toggle-stores";
import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";
import { Fragment, useEffect, useMemo, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import FormProvider from "@/uikit/FormProvider";
import Input from "@/uikit/form/Input";
import TextArea from "@/uikit/form/TextArea";
import ModalCloseIcon from "@/components/icons/ModalCloseIcon";
import DateInput from "@/uikit/form/DatePicker";
import { useDropzone } from "react-dropzone";
import useTargetStore from "@/store/targets-store";
import { useTranslations } from "next-intl";
import { unbounded } from "@/styles/fonts";
import emptyImageIcon from "/public/images/profile/empty-image.png";
import List from "@/uikit/form/List";
import CheckBox from "@/uikit/form/CheckBox";

export interface TargetPopupProps {
  title: string;
  beginDate: Date;
  endDate: Date;
  image: File | null;
  assistent: string;
  content: string;
  demand: number;
  value: number | null;
}

interface CreateTargetPopupProps {
  id?: number | null;
}

export function CreateTargetPopup({ id }: CreateTargetPopupProps) {
  const { isOpen, close } = usePopupTargetStore();

  const { addTarget, getTarget, editTarget } = useTargetStore();
  const [currentAssistent, setAssistent] = useState("Алиса");
  const [isVisible, setIsVisible] = useState(false);

  const t = useTranslations("Popup");

  const defaultValues: TargetPopupProps = useMemo(
    () => ({
      title: "",
      beginDate: new Date(),
      endDate: new Date(),
      image: null,
      assistent: "Alice",
      content: "",
      demand: 0,
      value: 0,
    }),
    []
  );

  const methods = useForm<TargetPopupProps>({
    defaultValues,
  });

  const [url, setUrl] = useState<null | string>(null);

  const { handleSubmit, watch, setValue, control, reset } = methods;

  const image = useWatch({ control, name: "image" });

  useEffect(() => {
    if (image) {
      setUrl(URL.createObjectURL(image));
    }
  }, [image]);

  useEffect(() => {
    if (id) {
      getTarget(id).then((res) => {
        reset({
          title: res.result.title,
          beginDate: new Date(res.result.beginDate),
          endDate: new Date(res.result.endDate),
          image: null,
          assistent: res.result.assistent,
          content: res.result.content,
          demand: Number(res.result.demand),
          value: Number(res.result.value),
        });
      });
    }
  }, [id]);

  const onSubmit = async (state: TargetPopupProps) => {
    let formData = new FormData();
    state.title && formData.append("title", state.title);
    state.content && formData.append("content", state.content);
    state.beginDate && formData.append("beginDate", state.beginDate.toString());
    state.endDate && formData.append("endDate", state.endDate.toString());
    state.image && formData.append("image", state.image);
    state.assistent && formData.append("assistent", state.assistent);
    state.demand && formData.append("demand", String(state.demand));
    state.value
      ? formData.append("value", String(state.value))
      : formData.append("value", "");

    if (id) {
      await editTarget(id, formData).then(close);
    } else {
      await addTarget(formData).then(close);
    }

    window.location.reload();
  };

  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    multiple: false,
    onDrop: (acceptedFiles1) => {
      setValue("image", acceptedFiles1[0]);
    },
    useFsAccessApi: false,
    accept: {
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
    },
    maxSize: 10485760,
  });

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={close}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/50" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="relative w-full rounded-[10px] max-w-7xl transform overflow-hidden bg-black px-[60px] pt-[60px] pb-[40px] text-left align-middle shadow-xl transition-all">
                  <ModalCloseIcon onClick={close} />
                  <FormProvider
                    methods={methods}
                    onSubmit={handleSubmit(onSubmit)}
                    className=" grid grid-cols-1 gap-y-6 bg-white rounded-[10px] p-[40px] text-black"
                  >
                    <div className={`${unbounded.className} text-2xl`}>
                      {t("target.addTarget")}
                    </div>
                    <Input name="title" placeholder={t("target.title")} />
                    <TextArea
                      placeholder={t("target.content")}
                      name={"content"}
                      innerPlaceholder={t("target.contentPlaceholder")}
                    />
                    <div className="flex w-full justify-between">
                      <Input
                        type="currency"
                        name="value"
                        placeholder={t("target.value")}
                        bottom={
                          <p className="text-[18px] text-main-gray-2 px-[3px] !mt-2">
                            {t("target.valueText")}
                          </p>
                        }
                      />
                      <Input
                        type="currency"
                        name="demand"
                        placeholder={t("target.demand")}
                      />
                    </div>
                    <div className="flex justify-between max-h-[89px]">
                      <DateInput
                        placeholder={t("target.beginDate")}
                        name={"beginDate"}
                      />
                      <DateInput
                        placeholder={t("target.endDate")}
                        name={"endDate"}
                      />
                    </div>
                    <div {...getRootProps()}>
                      <input
                        {...getInputProps()}
                        type="file"
                        className="hidden"
                      />
                      <div className="flex gap-6 items-center">
                        <Image
                          src={emptyImageIcon}
                          alt=""
                          width={150}
                          height={150}
                        />
                        {!url ? (
                          <div className="flex flex-col gap-2.5 text-black text-[20px]">
                            <p>{t("target.maxSize")}</p>
                            <p>{t("target.format")}: jpg / png</p>
                          </div>
                        ) : (
                          <p>{t("target.image")}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex">
                      <p className="text-[20px] w-1/2">
                        {t("target.assistent")}
                      </p>
                      <List
                        className="gap-4 !justify-start"
                        value={currentAssistent}
                        setValue={setAssistent}
                        arrayValues={["Алиса", "Максим", "Ирина", "Ипполит"]}
                      />
                    </div>
                    <p className="text-[18px] text-main-gray-2 px-[3px] -mt-3">
                      {t("target.assistentText")}
                    </p>
                    <div className="flex items-center gap-2">
                      <CheckBox isChecked={isVisible} setIsChecked={setIsVisible} />
                      {t("target.bottomText")}
                    </div>
                    <div className="flex justify-center gap-10">
                      <button
                        type="submit"
                        className={`${unbounded.className} text-[20px] bg-[#CB9E31] py-4 px-16 rounded-xl text-white`}
                      >
                        {t("target.addTarget")}
                      </button>
                    </div>
                  </FormProvider>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
