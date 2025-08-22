import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";

interface FormData {
  skill: string;
}

interface SkillsAddModalProps {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onAddSkill: (skill: string) => void;
}

const SkillsAddModal: React.FC<SkillsAddModalProps> = ({
  isModalOpen,
  setIsModalOpen,
  onAddSkill,
}) => {
  const { register, handleSubmit, reset } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    if (!data.skill || data.skill.trim() === '') {
      return; // Don't submit empty skills
    }

    onAddSkill(data.skill);
    reset();
    setIsModalOpen(false);
  };

  return (
    <div>
      {isModalOpen && (
        <div className="fixed inset-0 bg-[rgba(0,0,0,0.5)] bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Add New Skill</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-gray-700">Skill</label>
                <input
                  {...register("skill", { required: true })}
                  className="w-full border-b border-gray-300 focus:outline-none"
                  placeholder="Enter skill"
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-200 cursor-pointer "
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary cursor-pointer text-white rounded hover:bg-green-600"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SkillsAddModal;
