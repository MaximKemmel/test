"use client";
import { usePopupStatisticFilterStore } from "@/store/toggle-stores";
import { Sprite } from "@/tags/sprite";
import { Dialog, Transition } from "@headlessui/react";
import clsx from "clsx";
import {
  Dispatch,
  Fragment,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from "react";
import ModalCloseIcon from "@/components/icons/ModalCloseIcon";
import { useForm } from "react-hook-form";
import FormProvider from "@/uikit/FormProvider";
import Input from "@/uikit/form/Input";
import { useTranslations } from "next-intl";
import { unbounded } from "@/styles/fonts";
import List from "@/uikit/form/List";

interface filterType {
  level: number;
  type: MatrixType;
  id: number;
  direction: DirectionType;
  typeTx: TxType;
}

type MatrixType = "Line5" | "M3" | "M6";
type DirectionType = "Входящие" | "Исходящие";
type TxType = "Проданные места";

const MatrixNames: MatrixType[] = ["Line5", "M3", "M6"];
const directions: DirectionType[] = ["Входящие", "Исходящие"];
const typesTx: TxType[] = ["Проданные места"];
const levels = Array(12)
  .fill(0)
  .map((el, index) => (index + 1).toString());

const defaultState: filterType = {
  level: 4,
  type: "Line5",
  id: 1,
  direction: "Входящие",
  typeTx: "Проданные места",
};

export interface StaticsPopup {
  level: string;
  direction: string;
  typeTx: string;
  type: string;
  search: string;
}

export function StatisticFilterPopup({
  onAcceptFilter,
}: {
  onAcceptFilter: (filter: StaticsPopup) => void;
}) {
  const { isOpen, close } = usePopupStatisticFilterStore();

  const t = useTranslations("Popup");

  const defaultValues: StaticsPopup = useMemo(
    () => ({
      level: "",
      type: "",
      search: "",
      typeTx: "",
      direction: "",
    }),
    []
  );

  const [filter, setFilter] = useState<filterType>(defaultState);
  const [currentMatrix, setCurrentMatrix] = useState("Line5");
  const [currentDirection, setCurrentDirection] = useState("Входящие");
  const [currentTxType, setCurrentTxType] = useState("Проданные места");
  const [currentLevel, setCurrentLevel] = useState("1");

  const methods = useForm<StaticsPopup>({
    defaultValues,
  });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
    setValue,
  } = methods;

  useEffect(() => {
    setValue("level", String(filter.level));
    setValue("type", String(filter.type));
    setValue("direction", String(filter.direction));
    setValue("typeTx", String(filter.typeTx));
  }, [filter]);

  const onSubmit = (data: StaticsPopup) => {
    onAcceptFilter({
      type: currentMatrix,
      direction: currentDirection,
      typeTx: currentTxType,
      level: currentLevel,
      search: "",
    } as StaticsPopup);
  };
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
                <Dialog.Panel className="relative w-full rounded-[10px] max-w-4xl transform overflow-hidden bg-black px-[60px] pt-[60px] pb-[40px] text-left align-middle shadow-xl transition-all">
                  <ModalCloseIcon onClick={close} />
                  <FormProvider
                    methods={methods}
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col gap-6 bg-white rounded-[10px] p-[40px] text-black"
                  >
                    <div className={`${unbounded.className} text-2xl`}>
                      {t("statics.filter")}
                    </div>
                    <div className="flex gap-[10px]">
                      <p className="text-[20px] w-[250px]">{t("statics.level")}</p>
                      <List
                        className="gap-[5px] !justify-start"
                        value={currentLevel}
                        setValue={setCurrentLevel}
                        arrayValues={levels}
                        isHorizontal={true}
                      />
                    </div>
                    <div className="flex gap-[10px]">
                      <p className="text-[20px] w-[250px]">
                        {t("statics.type")}
                      </p>
                      <List
                        className="gap-4 !justify-start"
                        value={currentMatrix}
                        setValue={setCurrentMatrix}
                        arrayValues={MatrixNames}
                      />
                    </div>
                    <div className="flex gap-[10px]">
                      <p className="text-[20px] w-[250px]">
                        {t("statics.direction")}
                      </p>
                      <List
                        className="gap-4 !justify-start"
                        value={currentDirection}
                        setValue={setCurrentDirection}
                        arrayValues={directions}
                      />
                    </div>
                    <div className="flex gap-[10px]">
                    <p className="text-[20px] w-[250px]">{t("statics.typeTx")}</p>
                      <List
                        className="gap-4 !justify-start"
                        value={currentTxType}
                        setValue={setCurrentTxType}
                        arrayValues={typesTx}
                      />
                    </div>
                    <Input
                      name="search"
                      placeholder={t("statics.placeholder")}
                      classNameLabel="text-[20px] w-full"
                    />
                    <div className="col-span-2 flex justify-center gap-10 xs:gap-5 xs:flex-col">
                      <button
                        type="submit"
                        className={`${unbounded.className} text-[20px] bg-[#CB9E31] py-4 px-16 rounded-xl text-white`}
                      >
                        {t("statics.accept")}
                      </button>
                      <button
                        type="button"
                        className={`${unbounded.className} text-[16px] bg-white py-4 px-16 text-black`}
                        onClick={() => {
                          setFilter(defaultState);
                          reset(defaultValues);
                        }}
                      >
                        {t("statics.reset")}
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
