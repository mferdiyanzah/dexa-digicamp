import { Button, Form, Input, Modal, ModalProps, message } from "antd";
import { ITask } from "./Task";
import { updateTask } from "../services/api";

interface IEditModalProps extends ModalProps {
  handleGetTasks: () => void;
  task: ITask;
  onCancel: () => void;
}

export default function EditModal(props: IEditModalProps) {
  const [form] = Form.useForm();

  const handleUpdateTask = () => {
    const values = form.getFieldsValue();

    const updatedTask: ITask = {
      ...props.task,
      ...values,
    };

    updateTask(props.task.id, updatedTask)
      .then(() => {
        message.success("Task updated successfully");
        props.handleGetTasks();
        props.onCancel();
      })
      .catch(() => {
        message.error("Error updating task");
      });
  };

  return (
    <Modal {...props} footer={null} title="Edit Task" centered>
      <Form
        form={form}
        layout="vertical"
        initialValues={props.task}
        onFinish={handleUpdateTask}
      >
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: "Please enter a title" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="Description" name="description">
          <Input.TextArea />
        </Form.Item>

        <Button htmlType="submit" type="default">
          Save
        </Button>
      </Form>
    </Modal>
  );
}
