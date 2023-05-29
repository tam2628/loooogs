"use client";

import { Formik } from "formik";
import { Input } from "./Input";
import { Textarea } from "./Textarea";
import * as Yup from "yup";
import { Button } from "./Button";
import { useDispatch } from "react-redux";
import { addComment } from "@/redux/commentsSlice";

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Please enter a valid email"),
  comment: Yup.string().required("Comment is required"),
});

type CommentFormProps = {
  postId: number;
};

export default function CommentForm({ postId }: CommentFormProps) {
  const dispatch = useDispatch();

  return (
    <Formik
      initialValues={{
        name: "",
        email: "",
        comment: "",
      }}
      validationSchema={validationSchema}
      onSubmit={(values, { resetForm, setSubmitting }) => {
        dispatch(
          addComment({
            author: values.name,
            body: values.comment,
            id: 1212, // just a random number
            postId,
          })
        );
        resetForm();
        setSubmitting(false);
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
      }) => (
        <form className="w-full" onSubmit={handleSubmit}>
          <div className="flex w-full max-sm:flex-col min-md:flex-row">
            <div className="w-full mb-2 min-md:mr-2">
              <label>Name</label>
              <Input
                placeholder="Enter your name"
                name="name"
                className="block"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
                isInvalid={touched.name && !!errors.name}
              />
              <span className="text-rose-400 text-sm">
                {touched.name && errors.name}
              </span>
            </div>
            <div className="w-full mb-2">
              <label>Email (optional)</label>
              <Input
                placeholder="Enter your email"
                name="email"
                type="email"
                className="block"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                isInvalid={touched.email && !!errors.email}
              />
              <span className="text-rose-400 text-sm">
                {touched.email && errors.email}
              </span>
            </div>
          </div>
          <div className="mb-2">
            <label>Comment</label>
            <Textarea
              placeholder="Write something nice"
              name="comment"
              className="block w-full"
              onChange={handleChange}
              onBlur={handleBlur}
              defaultValue={values.comment}
              isInvalid={touched.comment && !!errors.comment}
            />
            <span className="text-rose-400 text-sm">
              {touched.comment && errors.comment}
            </span>
          </div>
          <div>
            <Button
              type="submit"
              isLoading={isSubmitting}
              loadingText="Submitting..."
              className="px-5"
            >
              Post comment
            </Button>
          </div>
        </form>
      )}
    </Formik>
  );
}
