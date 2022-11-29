import { useFormik } from "formik";
import React from "react";
import * as Yup from "yup";

import { ALL_CATEGORIES } from "../../shared/constants/app.constants";
import { BlogFormContent } from "../../shared/models/blog-form-content.interface";
import { Post } from "../../shared/models/post.interface";
import Button from "../../ui/button/Button";
import Image from "../../ui/image/Image";
import InputEditor from "../../ui/input-editor/InputEditor";
import InputFile from "../../ui/input-file/InputFile";
import InputSelect from "../../ui/input-select/InputSelect";
import InputText from "../../ui/input-text/InputText";

export interface BlogFormProps {
  post?: Post;
  loading?: boolean;
  onFormSubmit: (formValues: BlogFormContent) => void;
}

export default function BlogForm({
  post,
  loading = false,
  onFormSubmit,
}: BlogFormProps) {
  const formik = useFormik({
    initialValues: {
      title: post?.title ?? "",
      category: post?.category ?? '',
      content: post?.content ?? "",
      featuredImage: post?.featuredImage ?? "",
    },
    onSubmit: (values: BlogFormContent) => {
      onFormSubmit(values);
    },
    validationSchema: Yup.object({
      category: Yup.string().required("Please select a category"),
      title: Yup.string().required("Please enter a title"),
      content: Yup.string().required("Please enter a content"),
      featuredImage: Yup.string().required("Please select featured image"),
    }),
  });

  return (
    <div className="flex content-center items-center justify-center h-full">
      <div className="w-full px-4">
        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-300 border-0">
          <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
            <>
              <div className="text-gray-800 text-center mb-3 font-bold">
                <small>{post?.id ? "Edit" : "New"} Blog</small>
              </div>

              <form onSubmit={formik.handleSubmit}>
                <div className="flex">
                  <div className="relative w-2/5 mb-3">
                    <InputSelect
                      options={ALL_CATEGORIES}
                      placeholder="Category"
                      id="categoryInput"
                      label="Category"
                      name="category"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.category}
                      multiple={false}
                      error={
                        formik.touched.category && formik.errors.category
                          ? formik.errors.category
                          : null
                      }
                    />
                  </div>
                  <div className="relative w-2/5 mb-3 ml-2">
                    <InputFile
                      placeholder="Featured Image"
                      id="imageInput"
                      label="Featured Image"
                      name="featuredImage"
                      onChange={(contentStr: string) =>
                        formik.setFieldValue("featuredImage", contentStr)
                      }
                      accept="image/png, image/jpeg"
                      error={
                        formik.touched.featuredImage &&
                        formik.errors.featuredImage
                          ? formik.errors.featuredImage
                          : null
                      }
                    />
                  </div>
                  {formik.values.featuredImage && (
                    <Image
                      src={formik.values.featuredImage}
                      alt="featured"
                      classes="ml-2 w-28 h-28"
                    />
                  )}
                </div>

                <div className="relative w-full mb-3">
                  <InputText
                    type="text"
                    placeholder="Title"
                    id="titleInput"
                    label="Title"
                    name="title"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.title}
                    error={
                      formik.touched.title && formik.errors.title
                        ? formik.errors.title
                        : null
                    }
                  />
                </div>

                <div className="relative w-full mb-3">
                  <InputEditor
                    id="contentInput"
                    label="Content"
                    onChange={(contentStr: string) =>
                      formik.setFieldValue("content", contentStr)
                    }
                    value={formik.values.content}
                    error={
                      formik.touched.content && formik.errors.content
                        ? formik.errors.content
                        : null
                    }
                  />
                </div>

                <div className="mt-6">
                  <Button text="Publish" type="submit" loading={loading} />
                </div>
              </form>
            </>
          </div>
        </div>
      </div>
    </div>
  );
}
