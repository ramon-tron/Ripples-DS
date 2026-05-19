import 'package:flutter/material.dart';
import '../tokens/ds_tokens.dart';

class DSTextField extends StatelessWidget {
  const DSTextField({
    super.key,
    this.label,
    this.placeholder,
    this.hint,
    this.errorText,
    this.controller,
    this.onChanged,
    this.keyboardType,
    this.obscureText = false,
    this.enabled = true,
  });

  final String? label;
  final String? placeholder;
  final String? hint;
  final String? errorText;
  final TextEditingController? controller;
  final ValueChanged<String>? onChanged;
  final TextInputType? keyboardType;
  final bool obscureText;
  final bool enabled;

  OutlineInputBorder _border(Color color) => OutlineInputBorder(
    borderRadius: BorderRadius.circular(DSTokens.borderRadiusS),
    borderSide: BorderSide(color: color, width: DSTokens.borderWidthXs),
  );

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      mainAxisSize: MainAxisSize.min,
      children: [
        if (label != null) ...[
          Text(
            label!,
            style: TextStyle(
              fontFamily: 'Work Sans',
              fontSize: DSTokens.fontSizeS,
              fontWeight: DSTokens.fontWeightMedium,
              color: DSTokens.colorTextSecondary,
              height: DSTokens.lineHeightS / DSTokens.fontSizeS,
            ),
          ),
          SizedBox(height: DSTokens.spacing2xs),
        ],
        TextField(
          controller: controller,
          onChanged: onChanged,
          enabled: enabled,
          keyboardType: keyboardType,
          obscureText: obscureText,
          style: TextStyle(
            fontFamily: 'Work Sans',
            fontSize: DSTokens.fontSizeM,
            fontWeight: DSTokens.fontWeightRegular,
            color: DSTokens.colorTextPrimary,
          ),
          decoration: InputDecoration(
            hintText: placeholder,
            hintStyle: TextStyle(color: DSTokens.colorTextPlaceholder),
            errorText: errorText,
            helperText: hint,
            helperStyle: TextStyle(
              fontFamily: 'Work Sans',
              fontSize: DSTokens.fontSizeXs,
              color: DSTokens.colorTextTertiary,
            ),
            errorStyle: TextStyle(
              fontFamily: 'Work Sans',
              fontSize: DSTokens.fontSizeXs,
              color: DSTokens.colorTextError,
            ),
            contentPadding: EdgeInsets.symmetric(
              vertical: DSTokens.spacingXs,
              horizontal: DSTokens.spacingM,
            ),
            filled: true,
            fillColor: enabled
                ? DSTokens.colorFillPrimary
                : DSTokens.colorFillDisabled,
            border:              _border(DSTokens.colorBorderPrimary),
            enabledBorder:       _border(DSTokens.colorBorderPrimary),
            focusedBorder:       _border(DSTokens.colorBorderBrand),
            errorBorder:         _border(DSTokens.colorBorderError),
            focusedErrorBorder:  _border(DSTokens.colorBorderError),
            disabledBorder:      _border(DSTokens.colorBorderDisabled),
          ),
        ),
      ],
    );
  }
}
