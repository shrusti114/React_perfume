import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Modal } from "../../../components/ui/Modal";

const ProductSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  brand: Yup.string().required("Brand is required"),
  price: Yup.number().positive("Price must be positive").required("Price is required"),
  stock: Yup.number().integer().min(0).required("Stock is required"),
});

/**
 * Reusable Product Form within a Modal.
 */
export function ProductFormModal({ 
  isOpen, 
  onClose, 
  onSubmit, 
  initialValues = { name: "", brand: "", price: 0, stock: 0 } 
}) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={initialValues?._id ? "Edit Product" : "Add New Product"}
    >
      <Formik
        initialValues={initialValues}
        validationSchema={ProductSchema}
        enableReinitialize={true}
        onSubmit={(values, { setSubmitting }) => {
          onSubmit(values);
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Product Name</label>
              <Field
                name="name"
                className="w-full px-4 py-2 border rounded-md bg-background"
                placeholder="e.g. Chanel No. 5"
              />
              <ErrorMessage name="name" component="div" className="text-destructive text-xs mt-1" />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Brand</label>
              <Field
                name="brand"
                className="w-full px-4 py-2 border rounded-md bg-background"
                placeholder="e.g. Chanel"
              />
              <ErrorMessage name="brand" component="div" className="text-destructive text-xs mt-1" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Price (₹)</label>
                <Field
                  name="price"
                  type="number"
                  className="w-full px-4 py-2 border rounded-md bg-background"
                />
                <ErrorMessage name="price" component="div" className="text-destructive text-xs mt-1" />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Stock</label>
                <Field
                  name="stock"
                  type="number"
                  className="w-full px-4 py-2 border rounded-md bg-background"
                />
                <ErrorMessage name="stock" component="div" className="text-destructive text-xs mt-1" />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-6">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border rounded-md hover:bg-muted transition-colors"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors shadow-lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Saving..." : "Save Product"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </Modal>
  );
}
